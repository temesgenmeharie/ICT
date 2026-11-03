import { cookies } from "next/headers";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { verifyJwt } from "@/server/security/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("ict_token")?.value;
  const user = token ? await verifyJwt(token) : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar userEmail={user?.email} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
