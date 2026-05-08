"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Clock,
  Dumbbell,
  Flame,
  MessageSquare,
  TrendingUp,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";

// Mock Data
const TRAINER = {
  name: "Raj Patel",
  initials: "RP",
  specialty: "Strength & Conditioning",
  rating: 4.8,
  retentionRate: 94,
  sessionsToday: 8,
  totalStudents: 24,
};

const STUDENTS = [
  { id: "1", name: "Aarav Mehta", initials: "AM", goal: "Weight Loss", streak: 12, progress: 78, status: "active", lastVisit: "Today" },
  { id: "2", name: "Priya Singh", initials: "PS", goal: "Muscle Gain", streak: 28, progress: 92, status: "active", lastVisit: "Today" },
  { id: "3", name: "Riya Sharma", initials: "RS", goal: "Strength", streak: 9, progress: 65, status: "active", lastVisit: "Yesterday" },
  { id: "4", name: "Vikram Rao", initials: "VR", goal: "Endurance", streak: 5, progress: 45, status: "inactive", lastVisit: "5 days ago" },
  { id: "5", name: "Neha Kapoor", initials: "NK", goal: "Toning", streak: 3, progress: 34, status: "active", lastVisit: "Today" },
];

const PENDING_APPROVALS = [
  { id: "1", name: "Vikram Rao", type: "Check-in", time: "10:45 AM", status: "pending" },
  { id: "2", name: "Neha Kapoor", type: "Workout Complete", time: "11:30 AM", status: "pending" },
  { id: "3", name: "Riya Sharma", type: "Check-in", time: "2:15 PM", status: "pending" },
];

const ANNOUNCEMENTS = [
  { id: "1", title: "New equipment in gym", body: "We have added new cable machines. Please help members use them correctly.", date: "May 5" },
  { id: "2", title: "Monthly meeting", body: "All trainers meeting on May 10th at 9 AM.", date: "May 3" },
];

export default function TrainerDashboard() {
  const [approvals, setApprovals] = useState(PENDING_APPROVALS);

  const handleApprove = (id: string) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
  };

  const handleReject = (id: string) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {[
          { label: "My Students", value: TRAINER.totalStudents, icon: Users, color: "var(--primary)", trend: "3 new this month" },
          { label: "Sessions Today", value: TRAINER.sessionsToday, icon: Clock, color: "#8b5cf6", trend: "5 completed" },
          { label: "Pending Approvals", value: approvals.length, icon: AlertCircle, color: "#f59e0b", trend: "Needs attention" },
          { label: "Retention Rate", value: `${TRAINER.retentionRate}%`, icon: TrendingUp, color: "var(--success)", trend: "Up 2% this month" },
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
              <p style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.25rem" }}>{stat.value}</p>
              <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{stat.trend}</p>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1.5rem",
        }}
        className="two-col-grid"
      >
        {/* Pending Approvals */}
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
              <UserCheck size={20} color="var(--primary)" />
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--foreground)" }}>Pending Approvals</h3>
            </div>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--warning)",
                background: "#fef3c7",
                padding: "0.25rem 0.75rem",
                borderRadius: "9999px",
              }}
            >
              {approvals.length} pending
            </span>
          </div>

          {approvals.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {approvals.map((approval) => (
                <div
                  key={approval.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.875rem",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--secondary)",
                  }}
                >
                  <div>
                    <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)" }}>{approval.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                      {approval.type} - {approval.time}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      type="button"
                      onClick={() => handleApprove(approval.id)}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        border: "none",
                        background: "#dcfce7",
                        color: "var(--success)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      aria-label="Approve"
                    >
                      <CheckCircle size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReject(approval.id)}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        border: "none",
                        background: "#fee2e2",
                        color: "#ef4444",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      aria-label="Reject"
                    >
                      <XCircle size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                background: "var(--secondary)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <CheckCircle size={32} color="var(--success)" style={{ margin: "0 auto 0.5rem" }} />
              <p style={{ fontSize: "0.875rem", color: "var(--muted)" }}>All caught up! No pending approvals.</p>
            </div>
          )}
        </div>

        {/* My Students */}
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
              <Users size={20} color="var(--primary)" />
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--foreground)" }}>My Students</h3>
            </div>
            <a
              href="/trainer/students"
              style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.25rem" }}
            >
              View all <ChevronRight size={14} />
            </a>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {STUDENTS.slice(0, 5).map((student) => (
              <div
                key={student.id}
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
                  {student.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)" }}>{student.name}</p>
                    <span
                      style={{
                        fontSize: "0.625rem",
                        fontWeight: 600,
                        color: student.status === "active" ? "var(--success)" : "#ef4444",
                        background: student.status === "active" ? "#dcfce7" : "#fee2e2",
                        padding: "0.125rem 0.5rem",
                        borderRadius: "9999px",
                      }}
                    >
                      {student.status}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.25rem" }}>
                    <span style={{ fontSize: "0.6875rem", color: "var(--muted)" }}>{student.goal}</span>
                    <span style={{ fontSize: "0.6875rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <Flame size={12} /> {student.streak} days
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--primary)" }}>{student.progress}%</p>
                  <p style={{ fontSize: "0.6875rem", color: "var(--muted)" }}>{student.lastVisit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions & Announcements */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1.5rem",
        }}
        className="two-col-grid"
      >
        {/* Quick Actions */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "1.25rem",
          }}
        >
          <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "1rem" }}>Quick Actions</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.75rem",
            }}
          >
            {[
              { label: "Create Workout Plan", icon: Dumbbell, href: "/trainer/workouts" },
              { label: "Assign Diet Plan", icon: MessageSquare, href: "/trainer/diet" },
              { label: "Record Attendance", icon: UserCheck, href: "/trainer/attendance" },
              { label: "Send Message", icon: MessageSquare, href: "/trainer/messages" },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <a
                  key={action.label}
                  href={action.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "1rem",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--secondary)",
                    color: "var(--foreground)",
                    textDecoration: "none",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    transition: "all 0.15s ease",
                  }}
                >
                  <Icon size={18} color="var(--primary)" />
                  <span>{action.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Announcements */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "1.25rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <MessageSquare size={20} color="var(--primary)" />
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--foreground)" }}>Announcements</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {ANNOUNCEMENTS.map((announcement) => (
              <div
                key={announcement.id}
                style={{
                  padding: "0.875rem",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--secondary)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.375rem" }}>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)" }}>{announcement.title}</p>
                  <span style={{ fontSize: "0.6875rem", color: "var(--muted)" }}>{announcement.date}</span>
                </div>
                <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.5 }}>{announcement.body}</p>
              </div>
            ))}
          </div>
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
