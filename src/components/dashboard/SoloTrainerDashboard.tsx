"use client";

import { useMemo, useState } from "react";
import { BellPlus, ChartNoAxesCombined, Dumbbell, HandCoins, NotebookPen, PhoneCall, Ruler, UsersRound } from "lucide-react";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { ActionButton } from "@/components/ui/ActionButton";
import { MetricCard } from "@/components/ui/MetricCard";
import { Pill } from "@/components/ui/Pill";
import { Progress } from "@/components/ui/Progress";
import { Tabs } from "@/components/ui/Tabs";
import { DEMO_TODAY } from "@/lib/mock-store";
import type { ActionType, CheckIn, Lead, Member, OwnerMetrics, Payment, StoreCharts, WorkoutTemplate } from "@/lib/types";
import { currency, formatDate, formatTime } from "@/lib/utils";

type SoloTab = "home" | "clients" | "payments" | "leads" | "progress";

type SoloTrainerDashboardProps = {
  members: Member[];
  payments: Payment[];
  checkIns: CheckIn[];
  leads: Lead[];
  workoutTemplates: WorkoutTemplate[];
  metrics: OwnerMetrics;
  charts: StoreCharts;
  onAction: (action: ActionType, context?: string) => void;
};

const tabs: Array<{ id: SoloTab; label: string }> = [
  { id: "home", label: "Home" },
  { id: "clients", label: "Clients" },
  { id: "payments", label: "Payments" },
  { id: "leads", label: "Leads" },
  { id: "progress", label: "Progress" }
];

export function SoloTrainerDashboard({ members, payments, checkIns, leads, workoutTemplates, metrics, charts, onAction }: SoloTrainerDashboardProps) {
  const [activeTab, setActiveTab] = useState<SoloTab>("home");
  const todayCheckIns = checkIns.filter((checkIn) => checkIn.timestamp.slice(0, 10) === DEMO_TODAY);
  const dueMembers = members.filter((member) => member.pendingFees > 0);
  const openLeads = leads.filter((lead) => !["converted", "lost"].includes(lead.status));
  const monthlyIncome = metrics.monthlyRevenue;
  const attendanceGraph = members.map((member) => ({ label: member.initials, value: member.attendanceRate }));
  const latestPayments = useMemo(() => payments.slice().sort((a, b) => b.collectedAt.localeCompare(a.collectedAt)), [payments]);

  return (
    <main className="dashboard">
      <section className="dashboard-hero">
        <div className="hero-title">
          <span className="badge">Solo Trainer Workspace</span>
          <h1>Owner tools, simplified for one coach.</h1>
          <p>Clients, sessions, pending payments, monthly income, leads, progress tracker, and announcements.</p>
        </div>
        <div className="glass-card">
          <span className="fine-print">Monthly income</span>
          <div className="metric-value">{currency(monthlyIncome)}</div>
          <Pill>{todayCheckIns.length} sessions today</Pill>
        </div>
      </section>
      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === "home" ? (
        <>
          <section className="metric-grid">
            <MetricCard label="Clients" value={String(members.length)} trend={`${members.filter((member) => member.status === "active").length} active`} icon={UsersRound} />
            <MetricCard label="Sessions Today" value={String(todayCheckIns.length)} trend="actual check-ins" icon={ChartNoAxesCombined} />
            <MetricCard label="Pending Payments" value={currency(metrics.pendingFeesTotal)} trend={`${dueMembers.length} clients`} icon={HandCoins} direction="down" />
            <MetricCard label="Monthly Income" value={currency(monthlyIncome)} trend={`${payments.length} receipts`} icon={HandCoins} />
            <MetricCard label="Leads" value={String(openLeads.length)} trend="open prospects" icon={PhoneCall} />
            <MetricCard label="Progress Alerts" value={String(members.filter((member) => member.measurementAlert).length)} trend="measurements due" icon={Ruler} direction="down" />
          </section>
          <section className="quick-grid">
            <ActionButton icon={UsersRound} label="Add Client" onClick={() => onAction("add-member")} />
            <ActionButton icon={Dumbbell} label="Assign Workout" onClick={() => onAction("assign-workout")} />
            <ActionButton icon={Ruler} label="Progress Tracker" onClick={() => onAction("measurements", members[0]?.id)} />
            <ActionButton icon={HandCoins} label="Collect Payment" onClick={() => onAction("collect-fee", dueMembers[0]?.id ?? members[0]?.id)} />
            <ActionButton icon={PhoneCall} label="Add Lead" onClick={() => onAction("add-lead")} />
            <ActionButton icon={BellPlus} label="Announcement" onClick={() => onAction("announcement")} />
            <ActionButton icon={NotebookPen} label="Diet Note" onClick={() => onAction("diet-note", members[0]?.id)} />
          </section>
          <section className="content-grid">
            <article className="chart-card">
              <h3>Attendance graph</h3>
              <LineChart data={attendanceGraph.length ? attendanceGraph : [{ label: "NA", value: 0 }]} />
            </article>
            <article className="chart-card">
              <h3>Revenue monthly</h3>
              <BarChart data={charts.revenueMonthly} />
            </article>
          </section>
        </>
      ) : null}

      {activeTab === "clients" ? (
        <section className="card-grid">
          {members.length ? (
            members.map((member) => {
              const template = workoutTemplates.find((item) => item.id === member.workoutTemplateId);
              return (
                <article className="student-card" key={member.id}>
                  <div className="row-main">
                    <div className="person">
                      <span className="avatar neon">{member.initials}</span>
                      <div>
                        <strong>{member.name}</strong>
                        <span>{member.goal}</span>
                      </div>
                    </div>
                    <Pill tone={member.pendingFees > 0 ? "warning" : "default"}>{member.pendingFees > 0 ? "due" : "clear"}</Pill>
                  </div>
                  <span className="fine-print">Plan: {template?.name ?? "Not assigned"}</span>
                  <Progress value={member.attendanceRate} />
                  <div className="row-meta">
                    <button className="tiny-button" type="button" onClick={() => onAction("assign-workout", member.id)}>
                      Workout
                    </button>
                    <button className="tiny-button" type="button" onClick={() => onAction("measurements", member.id)}>
                      Progress
                    </button>
                    <button className="tiny-button" type="button" onClick={() => onAction("collect-fee", member.id)}>
                      {member.pendingFees > 0 ? "Collect" : "Renew Plan"}
                    </button>
                  </div>
                </article>
              );
            })
          ) : (
            <EmptyState title="No clients yet" body="Add your first client to begin tracking sessions and progress." />
          )}
        </section>
      ) : null}

      {activeTab === "payments" ? (
        <section className="content-grid">
          <article className="table-card">
            <h2>Pending payments</h2>
            {dueMembers.length ? (
              <div className="stack-list">
                {dueMembers.map((member) => (
                  <article className="member-row" key={member.id}>
                    <div className="row-main">
                      <strong>{member.name}</strong>
                      <span className="metric-value">{currency(member.pendingFees)}</span>
                    </div>
                    <button className="ghost-button" type="button" onClick={() => onAction("collect-fee", member.id)}>
                      Collect payment
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState title="No dues pending" body="All visible clients are financially clear." />
            )}
          </article>
          <article className="table-card">
            <h2>Payment history</h2>
            {latestPayments.length ? (
              <div className="stack-list">
                {latestPayments.map((payment) => (
                  <article className="member-row" key={payment.id}>
                    <div className="row-main">
                      <strong>{payment.memberName}</strong>
                      <Pill tone="cyan">{payment.method}</Pill>
                    </div>
                    <span className="metric-value">{currency(payment.amount)}</span>
                    <span className="fine-print">{formatDate(payment.collectedAt)}</span>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState title="No payments yet" body="Collect the first payment to start revenue tracking." />
            )}
          </article>
        </section>
      ) : null}

      {activeTab === "leads" ? (
        <section className="table-card">
          <div className="section-title">
            <div>
              <h2>Leads</h2>
              <p>Solo trainer prospect queue with direct conversion into paid clients.</p>
            </div>
            <button className="primary-button" type="button" onClick={() => onAction("add-lead")}>
              <PhoneCall size={17} aria-hidden="true" />
              Add Lead
            </button>
          </div>
          {leads.length ? (
            <div className="card-grid">
              {leads.map((lead) => (
                <article className="student-card" key={lead.id}>
                  <div className="row-main">
                    <div>
                      <strong>{lead.name}</strong>
                      <span className="fine-print">{lead.phone}</span>
                    </div>
                    <Pill tone={lead.status === "converted" ? "default" : "warning"}>{lead.status}</Pill>
                  </div>
                  <span className="fine-print">{lead.goal}</span>
                  <button className="ghost-button" type="button" disabled={lead.status === "converted"} onClick={() => onAction("convert-lead", lead.id)}>
                    {lead.status === "converted" ? "Converted" : "Convert to client"}
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="No leads yet" body="Add a walk-in, referral, or Instagram prospect." />
          )}
        </section>
      ) : null}

      {activeTab === "progress" ? (
        <section className="table-card">
          <h2>Today&apos;s sessions</h2>
          {todayCheckIns.length ? (
            <div className="stack-list">
              {todayCheckIns.map((checkIn) => (
                <article className="member-row" key={checkIn.id}>
                  <div className="row-main">
                    <strong>{checkIn.memberName}</strong>
                    <Pill tone={checkIn.late ? "warning" : "default"}>{checkIn.late ? "late" : "on time"}</Pill>
                  </div>
                  <span className="fine-print">
                    {formatDate(checkIn.timestamp)} at {formatTime(checkIn.timestamp)} via {checkIn.source}
                  </span>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="No sessions today" body="Record a check-in when your first client arrives." />
          )}
        </section>
      ) : null}
    </main>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="empty-state">
      <div>
        <strong>{title}</strong>
        <p>{body}</p>
      </div>
    </div>
  );
}
