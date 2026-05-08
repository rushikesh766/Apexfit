"use client";

import { Bell, LogOut, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { businessTypeLabels } from "@/lib/mock-store";
import type { BusinessType, Role } from "@/lib/types";

type AppShellProps = {
  role: Role;
  businessType: BusinessType | null;
  children: ReactNode;
  unreadCount: number;
  onLogout: () => void;
  onNotify: () => void;
};

export function AppShell({ role, businessType, children, unreadCount, onLogout, onNotify }: AppShellProps) {
  const roleLabel = role === "owner" ? `Owner / ${businessType ? businessTypeLabels[businessType] : "Business Admin"}` : "Owner";

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark">A</span>
          <div>
            <p className="brand-name">APEXFIT</p>
            <p className="brand-kicker">{roleLabel}</p>
          </div>
        </div>
        <div className="header-actions">
          <span className="badge">
            <ShieldCheck size={14} aria-hidden="true" />
            Live demo
          </span>
          <button className="icon-button" type="button" onClick={onNotify} aria-label="Enable notifications">
            <Bell size={18} aria-hidden="true" />
            {unreadCount ? <span className="notification-dot" aria-hidden="true">{unreadCount}</span> : null}
            {unreadCount ? <span className="sr-only">{unreadCount} unread notifications</span> : null}
          </button>
          <button className="icon-button" type="button" onClick={onLogout} aria-label="Log out">
            <LogOut size={18} aria-hidden="true" />
          </button>
        </div>
      </header>
      {children}
    </div>
  );
}
