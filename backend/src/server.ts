import 'dotenv/config';
import express from 'express'; import cors from 'cors'; import {PrismaClient} from '@prisma/client'; import {z} from 'zod';
const app=express(), db=new PrismaClient();
app.use(cors({origin:process.env.FRONTEND_ORIGIN||'http://localhost:5173'})); app.use(express.json());
app.get('/api/health',(_q,r)=>r.json({status:'ok'}));
app.get('/api/calendar',async(q,r)=>{
 const key=process.env.FMP_API_KEY;
 if(!key) return r.json({configured:false,timezone:'America/New_York',events:[],message:'Configure FMP_API_KEY to enable live events.'});
 try { const u=new URL('https://financialmodelingprep.com/stable/economic-calendar'); u.searchParams.set('from',String(q.query.from||new Date().toISOString().slice(0,10))); u.searchParams.set('to',String(q.query.to||new Date().toISOString().slice(0,10))); u.searchParams.set('apikey',key);
 const response=await fetch(u); if(!response.ok) throw Error('provider error'); const data:any[]=await response.json();
 const currencies=String(q.query.currencies||'USD,EUR').split(',');
 r.json({configured:true,timezone:'America/New_York',events:data.filter(e=>currencies.includes(e.currency)).map(e=>({...e,impact:/high/i.test(e.impact||'')?'HIGH':/medium/i.test(e.impact||'')?'MEDIUM':'LOW'}))});
 } catch {r.status(502).json({configured:true,error:'Calendar provider unavailable; verify API key, plan and endpoint.'});}
});
app.get('/api/trades',async(_q,r)=>r.json(await db.trade.findMany({orderBy:{createdAt:'desc'},take:100})));
app.post('/api/trades',async(q,r)=>{
 const schema=z.object({pair:z.string(),direction:z.enum(['LONG','SHORT']),session:z.string().optional(),entry:z.number().optional(),stopLoss:z.number().optional(),takeProfit:z.number().optional(),balance:z.number().positive(),riskPercent:z.number().positive().max(5),lotSize:z.number().positive().optional(),entryReason:z.string().optional(),checklist:z.record(z.boolean()).optional(),fvgMidpoint:z.number().optional(),ceInvalidated:z.boolean().optional()});
 const p=schema.safeParse(q.body); if(!p.success)return r.status(400).json(p.error.flatten());
 const x=p.data; r.status(201).json(await db.trade.create({data:{...x}}));
});
app.listen(Number(process.env.PORT||4000),()=>console.log('ICT API listening'));
