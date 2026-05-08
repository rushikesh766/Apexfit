"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Bell,
  Building2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Home,
  LogOut,
  Menu,
  Settings,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
};

const navItems: NavItem[] = [
  { id: "home", label: "Dashboard", icon: Home, href: "/owner" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/owner/analytics" },
  { id: "revenue", label: "Revenue", icon: CreditCard, href: "/owner/revenue" },
  { id: "trainers", label: "Trainers", icon: Users, href: "/owner/trainers" },
  { id: "members", label: "Members", icon: Users, href: "/owner/members" },
  { id: "attendance", label: "Attendance", icon: UserCheck, href: "/owner/attendance" },
  { id: "branches", label: "Branches", icon: Building2, href: "/owner/branches" },
  { id: "settings", label: "Settings", icon: Settings, href: "/owner/settings" },
];

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "var(--secondary)" }}>
      {/* Desktop Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? "260px" : "72px",
          background: "var(--card)",
          borderRight: "1px solid var(--border)",
          display: "none",
          flexDirection: "column",
          transition: "width 0.2s ease",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 40,
        }}
        className="sidebar-desktop"
      >
        {/* Logo */}
        <div
          style={{
            padding: sidebarOpen ? "1.25rem 1.5rem" : "1.25rem 1rem",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "var(--primary)",
              borderRadius: "var(--radius-sm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ color: "white", fontWeight: 800, fontSize: "1.125rem" }}>A</span>
          </div>
          {sidebarOpen && (
            <div>
              <h1 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.2 }}>APEXFIT</h1>
              <p style={{ fontSize: "0.6875rem", color: "var(--muted)", lineHeight: 1.2 }}>Owner Portal</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: sidebarOpen ? "0.75rem 1rem" : "0.75rem",
                  borderRadius: "var(--radius-sm)",
                  background: isActive ? "var(--accent)" : "transparent",
                  color: isActive ? "var(--primary)" : "var(--muted)",
                  textDecoration: "none",
                  fontWeight: isActive ? 600 : 500,
                  fontSize: "0.875rem",
                  transition: "all 0.15s ease",
                  justifyContent: sidebarOpen ? "flex-start" : "center",
                }}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </a>
            );
          })}
        </nav>

        {/* Collapse Button */}
        <div style={{ padding: "1rem", borderTop: "1px solid var(--border)" }}>
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              width: "100%",
              padding: "0.625rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)",
              background: "var(--background)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              color: "var(--muted)",
              fontSize: "0.8125rem",
            }}
          >
            {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            {sidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 50,
          }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: mobileMenuOpen ? 0 : "-280px",
          bottom: 0,
          width: "280px",
          background: "var(--card)",
          zIndex: 51,
          transition: "left 0.2s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "1rem 1.25rem",
            borderBottom: "1px solid var(--border)",
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
              <h1 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--foreground)" }}>APEXFIT</h1>
              <p style={{ fontSize: "0.6875rem", color: "var(--muted)" }}>Owner Portal</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "var(--radius-sm)",
              border: "none",
              background: "var(--secondary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--foreground)",
            }}
          >
            <X size={20} />
          </button>
        </div>
        <nav style={{ flex: 1, padding: "1rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.875rem 1rem",
                  borderRadius: "var(--radius-sm)",
                  background: isActive ? "var(--accent)" : "transparent",
                  color: isActive ? "var(--primary)" : "var(--foreground)",
                  textDecoration: "none",
                  fontWeight: isActive ? 600 : 500,
                  fontSize: "0.9375rem",
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
        <div style={{ padding: "1rem", borderTop: "1px solid var(--border)" }}>
          <button
            type="button"
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "0.875rem 1rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)",
              background: "var(--background)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              color: "var(--foreground)",
              fontSize: "0.9375rem",
              fontWeight: 500,
            }}
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
        className="main-content"
      >
        {/* Header */}
        <header
          style={{
            background: "var(--card)",
            borderBottom: "1px solid var(--border)",
            padding: "0.875rem 1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 30,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "var(--radius-sm)",
                border: "none",
                background: "var(--secondary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--foreground)",
              }}
              className="mobile-menu-btn"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--foreground)" }}>
                {navItems.find((item) => item.href === pathname)?.label || "Dashboard"}
              </h2>
              <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>APEXFIT Baner - Gym Command Center</p>
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
              />
            </button>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              RM
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: "1.5rem" }}>{children}</main>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .sidebar-desktop {
            display: flex !important;
          }
          .main-content {
            margin-left: ${sidebarOpen ? "260px" : "72px"};
            transition: margin-left 0.2s ease;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
