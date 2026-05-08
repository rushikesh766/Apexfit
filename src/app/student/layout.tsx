"use client";

import { usePathname, useRouter } from "next/navigation";
import { Bell, Calendar, Dumbbell, Home, LogOut, Trophy, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home, href: "/student" },
  { id: "workouts", label: "Workouts", icon: Dumbbell, href: "/student/workouts" },
  { id: "calendar", label: "Calendar", icon: Calendar, href: "/student/calendar" },
  { id: "leaderboard", label: "Ranks", icon: Trophy, href: "/student/leaderboard" },
  { id: "profile", label: "Profile", icon: User, href: "/student/profile" },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--background)",
      }}
    >
      {/* Mobile Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "var(--card)",
          borderBottom: "1px solid var(--border)",
          padding: "0.75rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              background: "var(--primary)",
              borderRadius: "var(--radius-sm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "white", fontWeight: 700, fontSize: "1rem" }}>A</span>
          </div>
          <div>
            <h1 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.2 }}>APEXFIT</h1>
            <p style={{ fontSize: "0.6875rem", color: "var(--muted)", lineHeight: 1.2 }}>Student Dashboard</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            type="button"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "var(--secondary)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--foreground)",
              position: "relative",
            }}
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                width: "8px",
                height: "8px",
                background: "#ef4444",
                borderRadius: "50%",
              }}
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            onClick={handleLogout}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "var(--secondary)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--foreground)",
            }}
            aria-label="Sign out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: "1rem",
          paddingBottom: "6rem",
          overflowY: "auto",
        }}
      >
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "var(--card)",
          borderTop: "1px solid var(--border)",
          padding: "0.5rem 0.75rem",
          paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))",
          display: "flex",
          justifyContent: "space-around",
          zIndex: 50,
        }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <a
              key={item.id}
              href={item.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.25rem",
                padding: "0.5rem 1rem",
                borderRadius: "var(--radius-sm)",
                background: isActive ? "var(--accent)" : "transparent",
                color: isActive ? "var(--primary)" : "var(--muted)",
                textDecoration: "none",
                transition: "all 0.15s ease",
                minWidth: "60px",
              }}
            >
              <Icon size={20} />
              <span style={{ fontSize: "0.625rem", fontWeight: isActive ? 600 : 500 }}>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
