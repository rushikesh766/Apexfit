"use client";

import {
  ArrowDown,
  ArrowUp,
  Building2,
  CalendarClock,
  ChevronRight,
  CreditCard,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";

// Mock Data
const METRICS = {
  totalMembers: 156,
  activeToday: 42,
  monthlyRevenue: 485000,
  pendingFees: 78500,
  expiringMemberships: 12,
  attendanceRate: 76,
};

const REVENUE_DATA = [
  { month: "Jan", value: 420000 },
  { month: "Feb", value: 445000 },
  { month: "Mar", value: 465000 },
  { month: "Apr", value: 475000 },
  { month: "May", value: 485000 },
];

const ATTENDANCE_DATA = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 52 },
  { day: "Wed", value: 48 },
  { day: "Thu", value: 55 },
  { day: "Fri", value: 42 },
  { day: "Sat", value: 38 },
  { day: "Sun", value: 22 },
];

const TRAINERS = [
  { id: "1", name: "Raj Patel", initials: "RP", specialty: "Strength", students: 24, retention: 94, rating: 4.8 },
  { id: "2", name: "Maya Sharma", initials: "MS", specialty: "Cardio", students: 18, retention: 89, rating: 4.6 },
  { id: "3", name: "Arjun Singh", initials: "AS", specialty: "CrossFit", students: 15, retention: 91, rating: 4.7 },
];

const RECENT_MEMBERS = [
  { id: "1", name: "Priya Singh", plan: "Premium Annual", joinDate: "May 5, 2026", status: "active" },
  { id: "2", name: "Vikram Rao", plan: "Monthly", joinDate: "May 3, 2026", status: "active" },
  { id: "3", name: "Neha Kapoor", plan: "Quarterly", joinDate: "May 1, 2026", status: "active" },
];

const BRANCHES = [
  { id: "1", name: "APEXFIT Baner", city: "Pune", members: 156, revenue: 485000, status: "active" },
  { id: "2", name: "APEXFIT Wakad", city: "Pune", members: 98, revenue: 320000, status: "active" },
  { id: "3", name: "APEXFIT Koregaon", city: "Pune", members: 72, revenue: 240000, status: "trial" },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function OwnerDashboard() {
  const maxRevenue = Math.max(...REVENUE_DATA.map((d) => d.value));
  const maxAttendance = Math.max(...ATTENDANCE_DATA.map((d) => d.value));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
        }}
      >
        {[
          { label: "Total Members", value: METRICS.totalMembers, icon: Users, color: "var(--primary)", trend: "+8 this month", up: true },
          { label: "Active Today", value: METRICS.activeToday, icon: UserCheck, color: "var(--success)", trend: "76% rate", up: true },
          { label: "Monthly Revenue", value: formatCurrency(METRICS.monthlyRevenue), icon: Wallet, color: "#8b5cf6", trend: "+12% growth", up: true },
          { label: "Pending Fees", value: formatCurrency(METRICS.pendingFees), icon: CreditCard, color: "#f59e0b", trend: "8 members", up: false },
          { label: "Expiring Soon", value: METRICS.expiringMemberships, icon: CalendarClock, color: "#ef4444", trend: "Next 14 days", up: false },
          { label: "Attendance Rate", value: `${METRICS.attendanceRate}%`, icon: TrendingUp, color: "var(--success)", trend: "+3% vs last month", up: true },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "1.25rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 500 }}>{stat.label}</span>
                <Icon size={18} color={stat.color} />
              </div>
              <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.25rem" }}>{stat.value}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                {stat.up ? <ArrowUp size={14} color="var(--success)" /> : <ArrowDown size={14} color="#ef4444" />}
                <span style={{ fontSize: "0.75rem", color: stat.up ? "var(--success)" : "#ef4444" }}>{stat.trend}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1.5rem",
        }}
        className="two-col-grid"
      >
        {/* Revenue Chart */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "1.25rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--foreground)" }}>Revenue Trend</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Monthly revenue over the last 5 months</p>
            </div>
            <a
              href="/owner/revenue"
              style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.25rem" }}
            >
              Details <ChevronRight size={14} />
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "0.75rem", height: "160px" }}>
            {REVENUE_DATA.map((item) => (
              <div key={item.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                <div
                  style={{
                    width: "100%",
                    height: `${(item.value / maxRevenue) * 140}px`,
                    background: "linear-gradient(180deg, var(--primary) 0%, #3b82f6 100%)",
                    borderRadius: "var(--radius-sm)",
                    minHeight: "20px",
                  }}
                />
                <span style={{ fontSize: "0.6875rem", color: "var(--muted)" }}>{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Chart */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "1.25rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--foreground)" }}>Weekly Attendance</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Daily check-ins this week</p>
            </div>
            <a
              href="/owner/attendance"
              style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.25rem" }}
            >
              Details <ChevronRight size={14} />
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "0.75rem", height: "160px" }}>
            {ATTENDANCE_DATA.map((item) => (
              <div key={item.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                <div
                  style={{
                    width: "100%",
                    height: `${(item.value / maxAttendance) * 140}px`,
                    background: "linear-gradient(180deg, var(--success) 0%, #4ade80 100%)",
                    borderRadius: "var(--radius-sm)",
                    minHeight: "20px",
                  }}
                />
                <span style={{ fontSize: "0.6875rem", color: "var(--muted)" }}>{item.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trainers & Members */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1.5rem",
        }}
        className="two-col-grid"
      >
        {/* Trainers */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "1.25rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--foreground)" }}>Trainers</h3>
            <a
              href="/owner/trainers"
              style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.25rem" }}
            >
              View all <ChevronRight size={14} />
            </a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {TRAINERS.map((trainer) => (
              <div
                key={trainer.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--secondary)",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "var(--primary)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                  }}
                >
                  {trainer.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)" }}>{trainer.name}</p>
                  <p style={{ fontSize: "0.6875rem", color: "var(--muted)" }}>{trainer.specialty} - {trainer.students} students</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--success)" }}>{trainer.retention}%</p>
                  <p style={{ fontSize: "0.6875rem", color: "var(--muted)" }}>retention</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Members */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "1.25rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--foreground)" }}>Recent Members</h3>
            <a
              href="/owner/members"
              style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.25rem" }}
            >
              View all <ChevronRight size={14} />
            </a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {RECENT_MEMBERS.map((member) => (
              <div
                key={member.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--secondary)",
                }}
              >
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)" }}>{member.name}</p>
                  <p style={{ fontSize: "0.6875rem", color: "var(--muted)" }}>{member.plan}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      color: "var(--success)",
                      background: "#dcfce7",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "9999px",
                    }}
                  >
                    {member.status}
                  </span>
                  <p style={{ fontSize: "0.6875rem", color: "var(--muted)", marginTop: "0.25rem" }}>{member.joinDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Branches */}
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "1.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Building2 size={20} color="var(--primary)" />
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--foreground)" }}>Branches Overview</h3>
          </div>
          <a
            href="/owner/branches"
            style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            Manage <ChevronRight size={14} />
          </a>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
          }}
        >
          {BRANCHES.map((branch) => (
            <div
              key={branch.id}
              style={{
                padding: "1rem",
                borderRadius: "var(--radius-sm)",
                background: "var(--secondary)",
                border: branch.status === "trial" ? "1px dashed var(--border)" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <div>
                  <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--foreground)" }}>{branch.name}</p>
                  <p style={{ fontSize: "0.6875rem", color: "var(--muted)" }}>{branch.city}</p>
                </div>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    color: branch.status === "active" ? "var(--success)" : "#f59e0b",
                    background: branch.status === "active" ? "#dcfce7" : "#fef3c7",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "9999px",
                  }}
                >
                  {branch.status}
                </span>
              </div>
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <div>
                  <p style={{ fontSize: "0.6875rem", color: "var(--muted)" }}>Members</p>
                  <p style={{ fontSize: "1rem", fontWeight: 600, color: "var(--foreground)" }}>{branch.members}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.6875rem", color: "var(--muted)" }}>Revenue</p>
                  <p style={{ fontSize: "1rem", fontWeight: 600, color: "var(--foreground)" }}>{formatCurrency(branch.revenue)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .two-col-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
