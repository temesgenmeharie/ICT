"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Clock,
  CheckSquare,
  Calculator,
  BookOpen,
  LineChart,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/calendar", label: "Economic Calendar", icon: CalendarDays },
  { href: "/sessions", label: "Trading Sessions", icon: Clock },
  { href: "/checklist", label: "ICT Checklist", icon: CheckSquare },
  { href: "/risk-calculator", label: "Risk Calculator", icon: Calculator },
  { href: "/journal", label: "Trade Journal", icon: BookOpen },
  { href: "/analytics", label: "Performance Analytics", icon: LineChart },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-card/50 flex flex-col shrink-0 min-h-[calc(100vh-57px)]">
      <div className="p-4 flex-1 space-y-1">
        <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground px-3 mb-2">
          Navigation
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-gold-500/15 text-gold-400 border border-gold-500/30 font-semibold"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive ? "text-gold-400" : "text-muted-foreground")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Safety Notice Footer */}
      <div className="p-4 border-t border-border/60 text-[11px] text-muted-foreground/80 leading-relaxed">
        <p className="font-semibold text-foreground/80 mb-1">Decision Support Only</p>
        <p>No automated trade execution. Verify risk limits and broker contract specs.</p>
      </div>
    </aside>
  );
}
