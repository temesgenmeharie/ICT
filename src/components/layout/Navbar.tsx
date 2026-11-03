"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, ShieldAlert, User as UserIcon, LogOut } from "lucide-react";

export function Navbar({ userEmail }: { userEmail?: string }) {
  const [nyTime, setNyTime] = useState<string>("");
  const [activeZone, setActiveZone] = useState<string>("Checking...");

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      // Format canonical America/New_York time
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const parts = formatter.formatToParts(now);
      const hours = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
      const minutes = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
      const totalMinutes = hours * 60 + minutes;

      setNyTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "America/New_York",
          dateStyle: "medium",
          timeStyle: "medium",
          timeZoneName: "short",
        }).format(now)
      );

      // ICT Kill Zones in NY Time:
      // Asian Session: 20:00 - 00:00 (1200 - 1440 min)
      // London Open Killzone: 02:00 - 05:00 (120 - 300 min)
      // NY AM Killzone: 07:00 - 10:00 (420 - 600 min)
      // London Close Killzone: 10:00 - 12:00 (600 - 720 min)
      // NY PM Killzone: 13:30 - 16:00 (810 - 960 min)
      if (totalMinutes >= 120 && totalMinutes <= 300) {
        setActiveZone("London Open Kill Zone (02:00 - 05:00 NY)");
      } else if (totalMinutes >= 420 && totalMinutes <= 600) {
        setActiveZone("NY AM Kill Zone (07:00 - 10:00 NY)");
      } else if (totalMinutes >= 600 && totalMinutes <= 720) {
        setActiveZone("London Close Kill Zone (10:00 - 12:00 NY)");
      } else if (totalMinutes >= 810 && totalMinutes <= 960) {
        setActiveZone("NY PM Kill Zone (13:30 - 16:00 NY)");
      } else if (totalMinutes >= 1200 || totalMinutes < 120) {
        setActiveZone("Asian Session (20:00 - 00:00 NY)");
      } else {
        setActiveZone("Off-Kill Zone Hours");
      }
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gold-500/20 border border-gold-500/40 flex items-center justify-center font-bold text-gold-400 text-sm">
            ICT
          </div>
          <span className="font-semibold text-foreground text-sm hidden sm:inline">
            ICT Preparation & Journal
          </span>
        </Link>

        {/* Canonical NY Clock */}
        <div className="hidden md:flex items-center space-x-2 rounded-full bg-secondary/60 px-3 py-1 border border-border/60 text-xs">
          <Clock className="h-3.5 w-3.5 text-gold-400 animate-pulse" />
          <span className="text-muted-foreground">NY Canon:</span>
          <span className="font-mono font-medium text-foreground">{nyTime || "Loading..."}</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Active Kill Zone Badge */}
        <div className="flex items-center space-x-1.5 rounded-md bg-gold-500/10 border border-gold-500/25 px-2.5 py-1 text-xs text-gold-400 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-ping" />
          <span>{activeZone}</span>
        </div>

        {/* User profile / Logout */}
        {userEmail ? (
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-muted-foreground hidden lg:inline">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-muted-foreground hover:text-destructive transition-colors p-1"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="text-xs bg-gold-500 hover:bg-gold-600 text-black font-semibold px-3 py-1.5 rounded-md transition-colors"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
