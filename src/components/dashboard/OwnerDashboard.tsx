"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowRightLeft,
  BadgeIndianRupee,
  BellPlus,
  Building2,
  CalendarClock,
  ChartNoAxesCombined,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  Dumbbell,
  Flame,
  HandCoins,
  LineChart as LineChartIcon,
  LockKeyhole,
  MapPin,
  PhoneCall,
  Plus,
  Search,
  Snowflake,
  UserCheck,
  UserCog,
  UserMinus,
  UserPlus,
  UsersRound,
  WalletCards
} from "lucide-react";
import { BarChart } from "@/components/charts/BarChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { Heatmap } from "@/components/charts/Heatmap";
import { LineChart } from "@/components/charts/LineChart";
import { ActionButton } from "@/components/ui/ActionButton";
import { MetricCard } from "@/components/ui/MetricCard";
import { Pill } from "@/components/ui/Pill";
import { Progress } from "@/components/ui/Progress";
import { Tabs } from "@/components/ui/Tabs";
import { DEMO_TODAY } from "@/lib/mock-store";
import type {
  ActionType,
  Branch,
  BranchComparison,
  BusinessType,
  CheckIn,
  GymPlan,
  Lead,
  Member,
  OwnerMetrics,
  Payment,
  PaymentMethod,
  StaffUser,
  StoreCharts,
  Trainer,
  WorkoutTemplate,
  Announcement
} from "@/lib/types";
import { compactNumber, currency, daysBetween, formatDate, formatTime } from "@/lib/utils";

type OwnerTab =
  | "home"
  | "members"
  | "trainers"
  | "checkins"
  | "fees"
  | "analytics"
  | "leads"
  | "plans"
  | "workouts"
  | "announcements"
  | "staff"
  | "branches";

type OwnerDashboardProps = {
  businessType: BusinessType;
  branches: Branch[];
  selectedBranchId: string;
  metrics: OwnerMetrics;
  charts: StoreCharts;
  branchComparison: BranchComparison[];
  members: Member[];
  trainers: Trainer[];
  plans: GymPlan[];
  workoutTemplates: WorkoutTemplate[];
  announcements: Announcement[];
  payments: Payment[];
  checkIns: CheckIn[];
  leads: Lead[];
  staffUsers: StaffUser[];
  dailyPin: string;
  onAction: (action: ActionType, context?: string) => void;
  onBranchChange: (branchId: string) => void;
  onFreezeMember: (memberId: string) => void;
  onRemoveMember: (memberId: string) => void;
  onAssignTrainer: (memberId: string, trainerId: string) => void;
  onTogglePlan: (planId: string) => void;
  onToggleStaff: (staffId: string) => void;
};

const baseTabs: Array<{ id: OwnerTab; label: string }> = [
  { id: "home", label: "Home" },
  { id: "members", label: "Members" },
  { id: "trainers", label: "Trainers" },
  { id: "checkins", label: "Check-ins" },
  { id: "fees", label: "Fees" },
  { id: "analytics", label: "Analytics" },
  { id: "leads", label: "Leads" },
  { id: "plans", label: "Plans" },
  { id: "workouts", label: "Workouts" },
  { id: "announcements", label: "Announcements" },
  { id: "staff", label: "Staff" }
];

export function OwnerDashboard({
  businessType,
  branches,
  selectedBranchId,
  metrics,
  charts,
  branchComparison,
  members,
  trainers,
  plans,
  workoutTemplates,
  announcements,
  payments,
  checkIns,
  leads,
  staffUsers,
  dailyPin,
  onAction,
  onBranchChange,
  onFreezeMember,
  onRemoveMember,
  onAssignTrainer,
  onTogglePlan,
  onToggleStaff
}: OwnerDashboardProps) {
  const [activeTab, setActiveTab] = useState<OwnerTab>("home");
  const [memberSearch, setMemberSearch] = useState("");
  const [memberFilter, setMemberFilter] = useState<"all" | "active" | "inactive" | "frozen" | "due" | "expiring">("all");
  const [paymentFilter, setPaymentFilter] = useState<"All" | PaymentMethod>("All");
  const activeBranch = branches.find((branch) => branch.id === selectedBranchId);
  const tabs = businessType === "multi-branch" ? [...baseTabs, { id: "branches" as const, label: "Branches" }] : baseTabs;

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch = `${member.name} ${member.email} ${member.phone}`.toLowerCase().includes(memberSearch.toLowerCase());
      const isExpiring = daysBetween(DEMO_TODAY, member.renewalDate) <= 14 && daysBetween(DEMO_TODAY, member.renewalDate) >= 0;
      const matchesFilter =
        memberFilter === "all" ||
        member.status === memberFilter ||
        (memberFilter === "due" && member.pendingFees > 0) ||
        (memberFilter === "expiring" && isExpiring);
      return matchesSearch && matchesFilter;
    });
  }, [memberFilter, memberSearch, members]);

  const visiblePayments = useMemo(() => {
    return payments.filter((payment) => paymentFilter === "All" || payment.method === paymentFilter);
  }, [paymentFilter, payments]);

  const dueMembers = members.filter((member) => member.pendingFees > 0);
  const expiringMembers = members.filter((member) => {
    const daysLeft = daysBetween(DEMO_TODAY, member.renewalDate);
    return daysLeft >= 0 && daysLeft <= 14;
  });
  const todayCheckIns = checkIns.filter((checkIn) => checkIn.timestamp.slice(0, 10) === DEMO_TODAY);
  const absentSevenPlus = members.filter((member) => daysBetween(member.lastVisit, DEMO_TODAY) >= 7);
  const topTrainer = [...trainers].sort((a, b) => b.retentionRate - a.retentionRate)[0];
  const conversionRate = leads.length
    ? Math.round((leads.filter((lead) => lead.status === "converted").length / leads.length) * 100)
    : 0;

  return (
    <main className="dashboard">
      <section className="dashboard-hero">
        <div className="hero-title">
          <span className="badge">{businessType === "multi-branch" ? "Chain Command Center" : "Gym Command Center"}</span>
          <h1>{businessType === "multi-branch" ? activeBranch?.name ?? "Selected branch" : "Today's gym control room is live."}</h1>
          <p>
            Connected operations for members, trainers, check-ins, fees, leads, plans, announcements, staff permissions,
            and analytics.
          </p>
        </div>
        <div className="glass-card">
          {businessType === "multi-branch" ? (
            <label>
              Branch selector
              <select value={selectedBranchId} onChange={(event) => onBranchChange(event.target.value)} aria-label="Select branch">
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
          <div className="row-main">
            <div>
              <span className="fine-print">Rotating daily PIN</span>
              <div className="metric-value">{dailyPin}</div>
            </div>
            <button className="primary-button" type="button" onClick={() => onAction("pin")}>
              Generate
            </button>
          </div>
        </div>
      </section>

      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === "home" ? (
        <>
          <section className="metric-grid">
            <MetricCard label="Total Members" value={String(metrics.totalMembers)} trend={`${members.filter((member) => member.status === "active").length} active`} icon={UsersRound} />
            <MetricCard label="Active Today" value={String(metrics.activeToday)} trend={`${metrics.sessionsToday} check-ins`} icon={Activity} />
            <MetricCard label="Pending Fees" value={currency(metrics.pendingFeesTotal)} trend={`${metrics.pendingFeesCount} unpaid members`} icon={WalletCards} direction="down" />
            <MetricCard label="Monthly Revenue" value={compactNumber(metrics.monthlyRevenue)} trend={`${payments.length} receipts`} icon={BadgeIndianRupee} />
            <MetricCard label="Expiring" value={String(metrics.expiringMemberships)} trend="Next 14 days" icon={CalendarClock} direction="down" />
            <MetricCard label="Leads" value={String(metrics.leadsOpen)} trend={`${conversionRate}% converted`} icon={PhoneCall} />
          </section>

          <section className="quick-grid">
            <ActionButton icon={UserPlus} label="Add Member" onClick={() => onAction("add-member")} />
            <ActionButton icon={Dumbbell} label="Add Trainer" onClick={() => onAction("add-trainer")} />
            <ActionButton icon={ClipboardCheck} label="Record Check-in" onClick={() => onAction("record-check-in")} />
            <ActionButton icon={HandCoins} label="Collect Fees" onClick={() => onAction("collect-fee", dueMembers[0]?.id ?? members[0]?.id)} />
            <ActionButton icon={PhoneCall} label="Add Lead" onClick={() => onAction("add-lead")} />
            <ActionButton icon={BellPlus} label="Send Announcement" onClick={() => onAction("announcement")} />
            <ActionButton icon={LockKeyhole} label="Generate Daily PIN" onClick={() => onAction("pin")} />
            <ActionButton icon={Flame} label="Assign Workout Plan" onClick={() => onAction("assign-workout")} />
            <ActionButton icon={UserCog} label="Create Staff User" onClick={() => onAction("add-staff")} />
          </section>

          <section className="content-grid">
            <article className="chart-card">
              <div className="card-header">
                <div>
                  <h3>Daily check-ins</h3>
                  <p>Actual attendance entries from the last seven days.</p>
                </div>
                <LineChartIcon size={19} color="var(--neon)" aria-hidden="true" />
              </div>
              <LineChart data={charts.dailyCheckIns} />
            </article>
            <article className="chart-card">
              <div className="card-header">
                <div>
                  <h3>Revenue monthly</h3>
                  <p>Connected to collected payments.</p>
                </div>
                <BadgeIndianRupee size={19} color="var(--neon)" aria-hidden="true" />
              </div>
              <BarChart data={charts.revenueMonthly} />
            </article>
            <article className="chart-card">
              <h3>New joins vs churn</h3>
              <BarChart data={charts.joinsVsChurn} />
            </article>
            <article className="chart-card">
              <h3>Payment recovery</h3>
              <DonutChart data={charts.paymentRecovery} />
            </article>
          </section>

          <section className="two-col">
            <article className="table-card">
              <h3>Expiring memberships</h3>
              {expiringMembers.length ? (
                <div className="stack-list">
                  {expiringMembers.map((member) => (
                    <article className="member-row" key={member.id}>
                      <div className="row-main">
                        <div className="person">
                          <span className="avatar gold">{member.initials}</span>
                          <div>
                            <strong>{member.name}</strong>
                            <span>Renewal {formatDate(member.renewalDate)}</span>
                          </div>
                        </div>
                        <button className="tiny-button" type="button" onClick={() => onAction("collect-fee", member.id)}>
                          Renew Plan
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <EmptyState title="No memberships expiring" body="Renewal pressure is clear for the next 14 days." />
              )}
            </article>
            <article className="chart-card">
              <h3>Peak hour heatmap</h3>
              <Heatmap data={charts.peakHours} />
            </article>
          </section>
        </>
      ) : null}

      {activeTab === "members" ? (
        <section className="table-card">
          <div className="section-title">
            <div>
              <h2>Member Management</h2>
              <p>Search, filter, collect dues, renew plans, assign trainers, freeze access, and remove inactive records.</p>
            </div>
            <button className="primary-button" type="button" onClick={() => onAction("add-member")}>
              <Plus size={17} aria-hidden="true" />
              Add
            </button>
          </div>
          <div className="toolbar">
            <label>
              <span className="sr-only">Search members</span>
              <input value={memberSearch} onChange={(event) => setMemberSearch(event.target.value)} aria-label="Search members" placeholder="Search name, email, phone" />
            </label>
            <div className="toolbar-actions">
              {(["all", "active", "inactive", "frozen", "due", "expiring"] as const).map((filter) => (
                <button
                  className={`tiny-button ${memberFilter === filter ? "active" : ""}`}
                  key={filter}
                  type="button"
                  onClick={() => setMemberFilter(filter)}
                >
                  {filter === "due" ? "Pending fees" : filter}
                </button>
              ))}
              <span className="badge">
                <Search size={14} aria-hidden="true" />
                {filteredMembers.length} results
              </span>
            </div>
          </div>
          {filteredMembers.length ? (
            <div className="member-list">
              {filteredMembers.map((member) => (
                <article className="member-row" key={member.id}>
                  <div className="row-main">
                    <div className="person">
                      <span className="avatar neon">{member.initials}</span>
                      <div>
                        <strong>{member.name}</strong>
                        <span>{member.email}</span>
                      </div>
                    </div>
                    <Pill tone={member.status === "active" ? "default" : member.status === "frozen" ? "cyan" : "danger"}>{member.status}</Pill>
                  </div>
                  <div className="mini-stats">
                    <span className="mini-stat">
                      <span>Join date</span>
                      <strong>{formatDate(member.joinDate)}</strong>
                    </span>
                    <span className="mini-stat">
                      <span>Renewal</span>
                      <strong>{formatDate(member.renewalDate)}</strong>
                    </span>
                    <span className="mini-stat">
                      <span>{member.pendingFees > 0 ? "Pending fees" : "Plan action"}</span>
                      <strong>{member.pendingFees > 0 ? currency(member.pendingFees) : "Renew Plan"}</strong>
                    </span>
                    <span className="mini-stat">
                      <span>Attendance</span>
                      <strong>{member.attendanceRate}%</strong>
                    </span>
                  </div>
                  <Progress value={member.attendanceRate} />
                  <div className="row-meta">
                    <select value={member.trainerId} aria-label={`Assign trainer for ${member.name}`} onChange={(event) => onAssignTrainer(member.id, event.target.value)}>
                      <option value="">No trainer</option>
                      {trainers.map((trainer) => (
                        <option key={trainer.id} value={trainer.id}>
                          {trainer.name}
                        </option>
                      ))}
                    </select>
                    <button className="tiny-button" type="button" onClick={() => onAction("collect-fee", member.id)}>
                      <HandCoins size={14} aria-hidden="true" />
                      {member.pendingFees > 0 ? "Collect" : "Renew Plan"}
                    </button>
                    <button className="tiny-button" type="button" onClick={() => onFreezeMember(member.id)}>
                      <Snowflake size={14} aria-hidden="true" />
                      {member.status === "frozen" ? "Unfreeze" : "Freeze"}
                    </button>
                    <button className="danger-button" type="button" onClick={() => onRemoveMember(member.id)}>
                      <UserMinus size={15} aria-hidden="true" />
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="No members found" body="Add a member or clear the current filters." />
          )}
        </section>
      ) : null}

      {activeTab === "trainers" ? (
        <section className="table-card">
          <div className="section-title">
            <div>
              <h2>Trainer Management</h2>
              <p>Assign members, monitor performance, retention, handled attendance, and ratings.</p>
            </div>
            <button className="primary-button" type="button" onClick={() => onAction("add-trainer")}>
              <Plus size={17} aria-hidden="true" />
              Add
            </button>
          </div>
          {trainers.length ? (
            <div className="trainer-list">
              {trainers.map((trainer) => (
                <article className="trainer-row" key={trainer.id}>
                  <div className="row-main">
                    <div className="person">
                      <span className="avatar">{trainer.initials}</span>
                      <div>
                        <strong>{trainer.name}</strong>
                        <span>{trainer.specialty}</span>
                      </div>
                    </div>
                    <Pill tone="cyan">{trainer.rating.toFixed(1)} rating</Pill>
                  </div>
                  <div className="mini-stats">
                    <span className="mini-stat">
                      <span>Members</span>
                      <strong>{trainer.assignedMemberIds.length}</strong>
                    </span>
                    <span className="mini-stat">
                      <span>Retention</span>
                      <strong>{trainer.retentionRate}%</strong>
                    </span>
                    <span className="mini-stat">
                      <span>Attendance handled</span>
                      <strong>{trainer.attendanceHandled}</strong>
                    </span>
                  </div>
                  <Progress value={trainer.retentionRate} />
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="No trainers yet" body="Create the first trainer to start assigning members." />
          )}
        </section>
      ) : null}

      {activeTab === "checkins" ? (
        <section className="table-card">
          <div className="section-title">
            <div>
              <h2>Check-ins</h2>
              <p>Actual attendance entries with duplicate prevention and late arrival tracking.</p>
            </div>
            <button className="primary-button" type="button" onClick={() => onAction("record-check-in")}>
              <ClipboardCheck size={17} aria-hidden="true" />
              Record
            </button>
          </div>
          {checkIns.length ? (
            <div className="stack-list">
              {checkIns
                .slice()
                .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
                .map((checkIn) => (
                  <article className="member-row" key={checkIn.id}>
                    <div className="row-main">
                      <div className="person">
                        <span className="avatar neon">
                          <CheckCircle2 size={17} aria-hidden="true" />
                        </span>
                        <div>
                          <strong>{checkIn.memberName}</strong>
                          <span>
                            {formatDate(checkIn.timestamp)} at {formatTime(checkIn.timestamp)}
                          </span>
                        </div>
                      </div>
                      <Pill tone={checkIn.late ? "warning" : "default"}>{checkIn.late ? "late" : checkIn.source}</Pill>
                    </div>
                  </article>
                ))}
            </div>
          ) : (
            <EmptyState title="No check-ins yet" body="Record the first visit from the front desk or daily PIN flow." />
          )}
        </section>
      ) : null}

      {activeTab === "fees" ? (
        <section className="content-grid">
          <article className="table-card">
            <div className="section-title">
              <div>
                <h2>Fees Section</h2>
                <p>Pending fees, payment recovery, collected revenue, and renewals are all connected.</p>
              </div>
              <button className="primary-button" type="button" onClick={() => onAction("collect-fee", dueMembers[0]?.id ?? members[0]?.id)}>
                <HandCoins size={17} aria-hidden="true" />
                Collect
              </button>
            </div>
            <div className="metric-grid">
              <MetricCard label="Due Members" value={String(dueMembers.length)} trend={currency(metrics.pendingFeesTotal)} icon={WalletCards} direction="down" />
              <MetricCard label="Collected Today" value={currency(payments.filter((payment) => payment.collectedAt.slice(0, 10) === DEMO_TODAY).reduce((sum, payment) => sum + payment.amount, 0))} trend="same-day receipts" icon={CreditCard} />
              <MetricCard label="Monthly Earnings" value={compactNumber(metrics.monthlyRevenue)} trend={`${payments.length} receipts`} icon={BadgeIndianRupee} />
            </div>
            <div className="payment-methods">
              {(["All", "Cash", "UPI", "Card"] as const).map((method) => (
                <button className={`tiny-button ${paymentFilter === method ? "active" : ""}`} key={method} type="button" onClick={() => setPaymentFilter(method)}>
                  {method}
                </button>
              ))}
            </div>
            {visiblePayments.length ? (
              <div className="fee-list">
                {visiblePayments.map((payment) => (
                  <article className="member-row" key={payment.id}>
                    <div className="row-main">
                      <div>
                        <strong>{payment.memberName}</strong>
                        <span className="fine-print">
                          {formatDate(payment.collectedAt)} at {formatTime(payment.collectedAt)}
                        </span>
                      </div>
                      <Pill tone="cyan">{payment.method}</Pill>
                    </div>
                    <div className="metric-value">{currency(payment.amount)}</div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState title="No payments found" body="Change the method filter or collect a payment." />
            )}
          </article>
          <article className="table-card">
            <h3>Due members</h3>
            {dueMembers.length ? (
              <div className="stack-list">
                {dueMembers.map((member) => (
                  <article className="member-row" key={member.id}>
                    <div className="row-main">
                      <div className="person">
                        <span className="avatar gold">{member.initials}</span>
                        <div>
                          <strong>{member.name}</strong>
                          <span>Renewal {formatDate(member.renewalDate)}</span>
                        </div>
                      </div>
                      <strong>{currency(member.pendingFees)}</strong>
                    </div>
                    <button className="ghost-button" type="button" onClick={() => onAction("collect-fee", member.id)}>
                      Collect due
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState title="No dues pending" body="All visible members are financially clear." />
            )}
          </article>
        </section>
      ) : null}

      {activeTab === "analytics" ? (
        <section className="content-grid">
          <article className="chart-card">
            <h3>Retention mix</h3>
            <DonutChart data={charts.retentionSegments} />
          </article>
          <article className="chart-card">
            <h3>Trainer performance</h3>
            <BarChart data={charts.trainerPerformance} />
          </article>
          <article className="table-card wide-span">
            <h3>Advanced analytics</h3>
            <section className="analytics-grid">
              {[
                { label: "Members likely to quit", value: String(absentSevenPlus.length + dueMembers.length), body: "Absent members plus unpaid members.", tone: "warning" },
                { label: "Absent 7+ days", value: String(absentSevenPlus.length), body: absentSevenPlus.map((member) => member.name).join(", ") || "No current risks.", tone: "danger" },
                { label: "Best attendance day", value: charts.dailyCheckIns.slice().sort((a, b) => b.value - a.value)[0]?.label ?? "N/A", body: "Derived from check-ins.", tone: "default" },
                { label: "Top trainer", value: topTrainer?.name ?? "N/A", body: `${topTrainer?.retentionRate ?? 0}% retention.`, tone: "cyan" },
                { label: "Conversion rate", value: `${conversionRate}%`, body: "Converted leads from selected scope.", tone: "default" }
              ].map((item) => (
                <article className="glass-card" key={item.label}>
                  <Pill tone={item.tone as "default" | "danger" | "warning" | "cyan"}>{item.label}</Pill>
                  <div className="metric-value">{item.value}</div>
                  <p className="muted">{item.body}</p>
                </article>
              ))}
            </section>
          </article>
        </section>
      ) : null}

      {activeTab === "leads" ? (
        <section className="table-card">
          <div className="section-title">
            <div>
              <h2>Leads</h2>
              <p>Track prospects, trial status, estimated value, and convert leads into members.</p>
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
                    <Pill tone={lead.status === "converted" ? "default" : lead.status === "lost" ? "danger" : "warning"}>{lead.status}</Pill>
                  </div>
                  <span className="fine-print">{lead.goal}</span>
                  <div className="mini-stats">
                    <span className="mini-stat">
                      <span>Source</span>
                      <strong>{lead.source}</strong>
                    </span>
                    <span className="mini-stat">
                      <span>Value</span>
                      <strong>{currency(lead.estimatedValue)}</strong>
                    </span>
                  </div>
                  <button className="ghost-button" type="button" disabled={lead.status === "converted"} onClick={() => onAction("convert-lead", lead.id)}>
                    <UserCheck size={15} aria-hidden="true" />
                    {lead.status === "converted" ? "Converted" : "Convert to member"}
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="No leads yet" body="Add a lead from walk-ins, referrals, website, or Instagram." />
          )}
        </section>
      ) : null}

      {activeTab === "plans" ? (
        <section className="table-card">
          <div className="section-title">
            <div>
              <h2>Plans Management</h2>
              <p>Create and activate monthly, quarterly, yearly, and personal training offers.</p>
            </div>
            <button className="primary-button" type="button" onClick={() => onAction("plan")}>
              <Plus size={17} aria-hidden="true" />
              Plan
            </button>
          </div>
          <div className="card-grid">
            {plans.map((plan) => (
              <article className="plan-card" key={plan.id}>
                <div className="row-main">
                  <strong>{plan.name}</strong>
                  <Pill tone={plan.active ? "default" : "danger"}>{plan.active ? "active" : "paused"}</Pill>
                </div>
                <div className="metric-value">{currency(plan.price)}</div>
                <span className="fine-print">
                  {plan.durationDays} days - {plan.category}
                </span>
                <span className="fine-print">{plan.offer}</span>
                <button className="ghost-button" type="button" onClick={() => onTogglePlan(plan.id)}>
                  {plan.active ? "Pause offer" : "Activate offer"}
                </button>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {activeTab === "workouts" ? (
        <section className="table-card">
          <div className="section-title">
            <div>
              <h2>Workout Plan Management</h2>
              <p>Assign templates to members and keep programming tied to the same member source.</p>
            </div>
            <button className="primary-button" type="button" onClick={() => onAction("assign-workout")}>
              <Flame size={17} aria-hidden="true" />
              Assign
            </button>
          </div>
          <div className="card-grid">
            {workoutTemplates.map((template) => (
              <article className="workout-card" key={template.id}>
                <div className="row-main">
                  <strong>{template.name}</strong>
                  <Pill tone="cyan">{template.difficulty}</Pill>
                </div>
                <span className="fine-print">{template.goal}</span>
                <div className="mini-stats">
                  <span className="mini-stat">
                    <span>Exercises</span>
                    <strong>{template.exercises.length}</strong>
                  </span>
                  <span className="mini-stat">
                    <span>Assigned</span>
                    <strong>{template.assignedCount}</strong>
                  </span>
                </div>
                <button className="ghost-button" type="button" onClick={() => onAction("assign-workout", template.id)}>
                  Assign template
                </button>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {activeTab === "announcements" ? (
        <section className="table-card">
          <div className="section-title">
            <div>
              <h2>Announcements</h2>
              <p>Send gym closure alerts, offers, challenges, and trainer messages as push notifications.</p>
            </div>
            <button className="primary-button" type="button" onClick={() => onAction("announcement")}>
              <BellPlus size={17} aria-hidden="true" />
              Send
            </button>
          </div>
          {announcements.length ? (
            <div className="announcement-list">
              {announcements.map((announcement) => (
                <article className="notification-card" key={announcement.id}>
                  <div className="row-main">
                    <strong>{announcement.title}</strong>
                    <Pill>{announcement.audience}</Pill>
                  </div>
                  <p className="muted">{announcement.body}</p>
                  <span className="fine-print">
                    {announcement.status} - {formatDate(announcement.sentAt)} at {formatTime(announcement.sentAt)}
                  </span>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="No announcements yet" body="Send the first announcement to notify staff or members." />
          )}
        </section>
      ) : null}

      {activeTab === "staff" ? (
        <section className="table-card">
          <div className="section-title">
            <div>
              <h2>Staff Permissions</h2>
              <p>Owner can create managers, receptionists, trainers, and accountants with restricted module access.</p>
            </div>
            <button className="primary-button" type="button" onClick={() => onAction("add-staff")}>
              <UserCog size={17} aria-hidden="true" />
              Staff
            </button>
          </div>
          {staffUsers.length ? (
            <div className="card-grid">
              {staffUsers.map((staff) => (
                <article className="student-card" key={staff.id}>
                  <div className="row-main">
                    <div>
                      <strong>{staff.name}</strong>
                      <span className="fine-print">{staff.email}</span>
                    </div>
                    <Pill tone={staff.active ? "default" : "danger"}>{staff.active ? staff.role : "paused"}</Pill>
                  </div>
                  <div className="row-meta">
                    {staff.modules.map((module) => (
                      <span className="badge" key={module}>
                        {module}
                      </span>
                    ))}
                  </div>
                  <button className="ghost-button" type="button" onClick={() => onToggleStaff(staff.id)}>
                    {staff.active ? "Pause access" : "Restore access"}
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="No staff users yet" body="Create internal users with module-level access." />
          )}
        </section>
      ) : null}

      {activeTab === "branches" ? (
        <section className="table-card">
          <div className="section-title">
            <div>
              <h2>Compare Branches</h2>
              <p>Chain-level comparison from each branch&apos;s same central source.</p>
            </div>
            <Pill tone="cyan">
              <MapPin size={14} aria-hidden="true" />
              {branches.length} branches
            </Pill>
          </div>
          <div className="card-grid">
            {branchComparison.map((branch) => (
              <article className="plan-card" key={branch.branchId}>
                <div className="row-main">
                  <strong>{branch.branchName}</strong>
                  <button className="tiny-button" type="button" onClick={() => onBranchChange(branch.branchId)}>
                    <ArrowRightLeft size={14} aria-hidden="true" />
                    View
                  </button>
                </div>
                <div className="mini-stats">
                  <span className="mini-stat">
                    <span>Members</span>
                    <strong>{branch.members}</strong>
                  </span>
                  <span className="mini-stat">
                    <span>Active today</span>
                    <strong>{branch.activeToday}</strong>
                  </span>
                  <span className="mini-stat">
                    <span>Revenue</span>
                    <strong>{currency(branch.revenue)}</strong>
                  </span>
                  <span className="mini-stat">
                    <span>Pending</span>
                    <strong>{currency(branch.pending)}</strong>
                  </span>
                </div>
                <Progress value={branch.revenue} max={Math.max(...branchComparison.map((item) => item.revenue), 1)} />
              </article>
            ))}
          </div>
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
