# ICT Trading Preparation & Journaling System

Starter monorepo: React + TypeScript + Vite frontend, Express + TypeScript backend, PostgreSQL + Prisma.

## Run
1. Install Node.js 20+ and Docker.
2. Copy `.env.example` to `.env`.
3. Run `docker compose up --build`.
4. Open http://localhost:5173. API health: http://localhost:4000/api/health

For local non-Docker development, run `npm install` in `frontend` and `backend`; configure `DATABASE_URL`, then run `npx prisma generate && npx prisma db push` in backend.

## Calendar
Set `FMP_API_KEY` to enable the FMP calendar adapter. Without a key, the app clearly reports that live calendar data is not configured. Verify the provider's current API plan, endpoint availability, rate limits and licensing before production use.

## Time
Store event timestamps as UTC instants. Display sessions and calendar events in `America/New_York`; use IANA timezone handling to account for EST/EDT automatically.

## Safety
This is a journal and decision-support tool, not broker execution or financial advice. Verify pip values and contract specifications with your broker. The C.E. midpoint rule is configurable to your exact entry model. A completed checklist does not guarantee a valid trade.
