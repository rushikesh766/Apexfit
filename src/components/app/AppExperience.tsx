"use client";

import { useEffect, useMemo, useState } from "react";
import { Building2, Dumbbell, Network, UsersRound } from "lucide-react";
import { ActionModal } from "@/components/app/ActionModal";
import { OwnerDashboard } from "@/components/dashboard/OwnerDashboard";
import { SoloTrainerDashboard } from "@/components/dashboard/SoloTrainerDashboard";
import { RoleLanding } from "@/components/landing/RoleLanding";
import { AppShell } from "@/components/layout/AppShell";
import { ToastStack, type Toast } from "@/components/layout/ToastStack";
import { Modal } from "@/components/ui/Modal";
import { demoRoleSignIn, requestFirebasePushToken } from "@/lib/firebase";
import { queueNotification, saveCheckIn, saveMember, savePayment, sendAnnouncement as saveAnnouncement, updateMemberStatus } from "@/lib/firebase-services";
import {
  businessTypeLabels,
  createInitialStore,
  DEMO_TODAY,
  deriveBranchComparison,
  deriveOwnerMetrics,
  deriveStoreCharts,
  scopeStore
} from "@/lib/mock-store";
import { registerServiceWorker, requestBrowserNotifications } from "@/lib/pwa";
import type {
  ActionType,
  Announcement,
  BusinessType,
  CheckIn,
  GymPlan,
  GymStore,
  Lead,
  LeaderboardEntry,
  MeasurementLog,
  Member,
  NotificationItem,
  Payment,
  PaymentMethod,
  StaffRole,
  StaffUser,
  Trainer,
  TransformationPhoto
} from "@/lib/types";
import { currency, generatePin, initials, nextRank, uid } from "@/lib/utils";

type ActionState = {
  type: ActionType;
  context?: string;
};

function stringValue(values: Record<string, FormDataEntryValue>, key: string) {
  const value = values[key];
  return typeof value === "string" ? value : "";
}

function numberValue(values: Record<string, FormDataEntryValue>, key: string, fallback = 0) {
  const parsed = Number(stringValue(values, key));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function addDays(date: string, days: number) {
  const next = new Date(`${date}T00:00:00+05:30`);
  next.setDate(next.getDate() + days);
  return next.toISOString().slice(0, 10);
}

function modulesForRole(role: StaffRole) {
  const modules: Record<StaffRole, string[]> = {
    Manager: ["Members", "Trainers", "Fees", "Plans", "Announcements", "Leads", "Analytics"],
    Receptionist: ["Members", "Check-ins", "Leads"],
    Trainer: ["Members", "Workouts", "Progress"],
    Accountant: ["Fees", "Plans", "Analytics"]
  };
  return modules[role];
}

const businessOptions: Array<{
  type: BusinessType;
  title: string;
  body: string;
  icon: typeof Dumbbell;
}> = [
  {
    type: "solo",
    title: "Solo Trainer",
    body: "A lean client operating system for one coach with leads, dues, sessions, income, and progress tracking.",
    icon: Dumbbell
  },
  {
    type: "multi-trainer",
    title: "Multi Trainer Gym",
    body: "Full gym operations for members, trainers, check-ins, fees, plans, staff, announcements, and analytics.",
    icon: UsersRound
  },
  {
    type: "multi-branch",
    title: "Multi Branch Chain",
    body: "Branch-scoped dashboards, selector, chain-wide operations, and branch comparison reporting.",
    icon: Network
  }
];

export function AppExperience() {
  const [store, setStore] = useState<GymStore>(() => createInitialStore());
  const [isAuthed, setIsAuthed] = useState(false);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const [modal, setModal] = useState<ActionState | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    registerServiceWorker();
  }, []);

  const businessType = store.settings.businessType;
  const selectedBranchId = store.settings.selectedBranchId;
  const scoped = useMemo(() => scopeStore(store, businessType, selectedBranchId), [businessType, selectedBranchId, store]);
  const metrics = useMemo(
    () => deriveOwnerMetrics({ members: scoped.members, payments: scoped.payments, checkIns: scoped.checkIns, leads: scoped.leads }),
    [scoped.checkIns, scoped.leads, scoped.members, scoped.payments]
  );
  const charts = useMemo(
    () => deriveStoreCharts({ members: scoped.members, payments: scoped.payments, checkIns: scoped.checkIns, trainers: scoped.trainers }),
    [scoped.checkIns, scoped.members, scoped.payments, scoped.trainers]
  );
  const branchComparison = useMemo(() => deriveBranchComparison(store), [store]);
  const unreadCount = store.notifications.filter((notification) => notification.audience === "Owner" && !notification.read).length;

  function addToast(title: string, body: string) {
    const toast = { id: uid("toast"), title, body };
    setToasts((current) => [toast, ...current].slice(0, 4));
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== toast.id));
    }, 4200);
  }

  function pushNotification(title: string, body: string, audience: NotificationItem["audience"]) {
    const notification: NotificationItem = {
      id: uid("not"),
      title,
      body,
      audience,
      createdAt: new Date().toISOString(),
      read: false
    };
    setStore((current) => ({ ...current, notifications: [notification, ...current.notifications] }));
    queueNotification(notification);
  }

  async function handleLogin() {
    await demoRoleSignIn();
    const savedBusinessType =
      typeof window !== "undefined" ? (window.localStorage.getItem("apexfit.businessType") as BusinessType | null) : null;
    setStore((current) => ({
      ...current,
      settings: {
        ...current.settings,
        businessType: savedBusinessType && businessTypeLabels[savedBusinessType] ? savedBusinessType : current.settings.businessType
      }
    }));
    setIsAuthed(true);
    setIsLoadingDashboard(true);
    window.setTimeout(() => setIsLoadingDashboard(false), 520);
    addToast("Owner login successful", "Business workspace is ready.");
  }

  function handleLogout() {
    setIsAuthed(false);
    setModal(null);
    addToast("Session closed", "Owner workspace locked.");
  }

  function handleSelectBusinessType(nextBusinessType: BusinessType) {
    setStore((current) => ({
      ...current,
      settings: {
        ...current.settings,
        businessType: nextBusinessType,
        selectedBranchId: current.settings.selectedBranchId || current.branches[0]?.id || "branch_baner"
      }
    }));
    window.localStorage.setItem("apexfit.businessType", nextBusinessType);
    setIsLoadingDashboard(true);
    window.setTimeout(() => setIsLoadingDashboard(false), 460);
    addToast("Business type saved", `${businessTypeLabels[nextBusinessType]} dashboard loaded.`);
  }

  async function handleNotify() {
    const permission = await requestBrowserNotifications();
    const token = permission === "granted" ? await requestFirebasePushToken() : null;
    setStore((current) => ({
      ...current,
      notifications: current.notifications.map((notification) =>
        notification.audience === "Owner" ? { ...notification, read: true } : notification
      )
    }));
    addToast(
      permission === "granted" ? "Notifications enabled" : "Notification status",
      token ? "Firebase Messaging token registered for this device." : `Browser permission: ${permission}. In-app alerts marked read.`
    );
  }

  function openAction(type: ActionType, context?: string) {
    setModal({ type, context });
  }

  function rotatePin() {
    const nextPin = generatePin();
    setStore((current) => ({ ...current, settings: { ...current.settings, dailyPin: nextPin } }));
    pushNotification("Daily PIN rotated", `New gym PIN is ${nextPin}.`, "Trainer");
    addToast("Daily PIN generated", `Students can now check in with ${nextPin}.`);
  }

  function handleActionSubmit(action: ActionState, values: Record<string, FormDataEntryValue>) {
    const branchId = stringValue(values, "branchId") || selectedBranchId;

    if (action.type === "add-member") {
      const plan = store.plans.find((item) => item.id === stringValue(values, "planId")) ?? store.plans[0];
      const name = stringValue(values, "name");
      const member: Member = {
        id: uid("mem"),
        branchId,
        name,
        email: stringValue(values, "email"),
        phone: stringValue(values, "phone"),
        initials: initials(name),
        status: "active",
        joinDate: DEMO_TODAY,
        renewalDate: addDays(DEMO_TODAY, plan.durationDays),
        pendingFees: plan.price,
        attendanceStreak: 0,
        attendanceRate: 0,
        lastVisit: `${DEMO_TODAY}T00:00:00+05:30`,
        trainerId: stringValue(values, "trainerId"),
        planId: plan.id,
        workoutTemplateId: store.workoutTemplates[0]?.id ?? "",
        weightKg: 72,
        startWeightKg: 72,
        goal: stringValue(values, "goal"),
        points: 0,
        rank: "Bronze",
        rating: 5,
        lateArrivals: 0,
        measurementAlert: true,
        notes: "First assessment is scheduled. Start with technique and mobility."
      };
      setStore((current) => ({
        ...current,
        members: [member, ...current.members],
        trainers: current.trainers.map((trainer) =>
          trainer.id === member.trainerId ? { ...trainer, assignedMemberIds: [...trainer.assignedMemberIds, member.id] } : trainer
        )
      }));
      saveMember(member);
      addToast("Member added", `${member.name} was enrolled on ${plan.name}.`);
    }

    if (action.type === "add-trainer") {
      const name = stringValue(values, "name");
      const trainer: Trainer = {
        id: uid("trn"),
        branchId,
        name,
        email: stringValue(values, "email"),
        initials: initials(name),
        specialty: stringValue(values, "specialty"),
        assignedMemberIds: [],
        retentionRate: 90,
        attendanceHandled: 0,
        rating: 4.6,
        plansNeedUpdate: 0,
        sessionsToday: 0
      };
      setStore((current) => ({ ...current, trainers: [trainer, ...current.trainers] }));
      addToast("Trainer saved", `${trainer.name} is ready for member assignment.`);
    }

    if (action.type === "announcement") {
      const announcement: Announcement = {
        id: uid("ann"),
        branchId,
        title: stringValue(values, "title"),
        body: stringValue(values, "body"),
        audience: stringValue(values, "audience") as Announcement["audience"],
        sentAt: new Date().toISOString(),
        status: "sent"
      };
      setStore((current) => ({ ...current, announcements: [announcement, ...current.announcements] }));
      saveAnnouncement(announcement);
      pushNotification(announcement.title, announcement.body, "Owner");
      addToast("Announcement sent", `${announcement.audience} audience received the update.`);
    }

    if (action.type === "pin") {
      rotatePin();
    }

    if (action.type === "assign-workout") {
      const memberId = stringValue(values, "memberId");
      const templateId = stringValue(values, "templateId");
      const member = store.members.find((item) => item.id === memberId);
      const template = store.workoutTemplates.find((item) => item.id === templateId);
      setStore((current) => ({
        ...current,
        members: current.members.map((item) => (item.id === memberId ? { ...item, workoutTemplateId: templateId } : item)),
        workoutTemplates: current.workoutTemplates.map((item) =>
          item.id === templateId ? { ...item, assignedCount: item.assignedCount + 1 } : item
        )
      }));
      addToast("Workout assigned", `${template?.name ?? "Plan"} assigned to ${member?.name ?? "member"}.`);
    }

    if (action.type === "collect-fee") {
      const memberId = stringValue(values, "memberId");
      const member = store.members.find((item) => item.id === memberId);
      const plan = store.plans.find((item) => item.id === member?.planId) ?? store.plans[0];
      const amount = numberValue(values, "amount", member?.pendingFees || plan?.price || 0);
      const method = stringValue(values, "method") as PaymentMethod;
      if (member && amount > 0) {
        const isRenewal = member.pendingFees === 0;
        const payment: Payment = {
          id: uid("pay"),
          branchId: member.branchId,
          memberId,
          memberName: member.name,
          amount,
          method,
          collectedAt: new Date().toISOString()
        };
        setStore((current) => ({
          ...current,
          payments: [payment, ...current.payments],
          members: current.members.map((item) =>
            item.id === memberId
              ? {
                  ...item,
                  pendingFees: isRenewal ? 0 : Math.max(0, item.pendingFees - amount),
                  renewalDate: isRenewal ? addDays(item.renewalDate, plan.durationDays) : item.renewalDate,
                  status: "active"
                }
              : item
          )
        }));
        savePayment(payment);
        addToast(isRenewal ? "Plan renewed" : "Payment collected", `${currency(amount)} received from ${member.name} by ${method}.`);
      }
    }

    if (action.type === "diet-note") {
      const memberId = stringValue(values, "memberId");
      const note = stringValue(values, "note");
      const member = store.members.find((item) => item.id === memberId);
      setStore((current) => ({
        ...current,
        members: current.members.map((item) => (item.id === memberId ? { ...item, notes: note } : item))
      }));
      pushNotification("Coach note updated", note, "Student");
      addToast("Diet note saved", `${member?.name ?? "Member"} received the coach note.`);
    }

    if (action.type === "measurements") {
      const memberId = stringValue(values, "memberId");
      const member = store.members.find((item) => item.id === memberId);
      const log: MeasurementLog = {
        id: uid("msr"),
        branchId: member?.branchId ?? branchId,
        memberId,
        date: DEMO_TODAY,
        weightKg: numberValue(values, "weightKg", member?.weightKg ?? 0),
        chestCm: numberValue(values, "chestCm", 0),
        waistCm: numberValue(values, "waistCm", 0),
        hipCm: numberValue(values, "hipCm", 0),
        pr: stringValue(values, "pr")
      };
      setStore((current) => ({
        ...current,
        measurements: [log, ...current.measurements],
        members: current.members.map((item) => (item.id === memberId ? { ...item, weightKg: log.weightKg, measurementAlert: false } : item))
      }));
      addToast("Measurements recorded", `${member?.name ?? "Member"} progress log was updated.`);
    }

    if (action.type === "transformation-photo") {
      const memberId = stringValue(values, "memberId");
      const member = store.members.find((item) => item.id === memberId);
      const photo: TransformationPhoto = {
        id: uid("pho"),
        branchId: member?.branchId ?? branchId,
        memberId,
        label: stringValue(values, "label"),
        date: DEMO_TODAY,
        tone: "green"
      };
      setStore((current) => ({ ...current, photos: [photo, ...current.photos] }));
      addToast("Photo added", `${member?.name ?? "Member"} transformation gallery was updated.`);
    }

    if (action.type === "trainer-reminder") {
      const body = stringValue(values, "body");
      pushNotification("Trainer reminder", body, "Trainer");
      addToast("Reminder sent", "Trainer and student reminder queues were updated.");
    }

    if (action.type === "plan") {
      const plan: GymPlan = {
        id: uid("plan"),
        name: stringValue(values, "name"),
        durationDays: numberValue(values, "durationDays", 30),
        price: numberValue(values, "price", 0),
        offer: stringValue(values, "offer"),
        category: stringValue(values, "category") as GymPlan["category"],
        active: true
      };
      setStore((current) => ({ ...current, plans: [plan, ...current.plans] }));
      addToast("Plan created", `${plan.name} is now available for assignment.`);
    }

    if (action.type === "add-lead") {
      const lead: Lead = {
        id: uid("lead"),
        branchId,
        name: stringValue(values, "name"),
        phone: stringValue(values, "phone"),
        source: stringValue(values, "source") as Lead["source"],
        goal: stringValue(values, "goal"),
        status: "new",
        estimatedValue: numberValue(values, "estimatedValue", 0),
        createdAt: new Date().toISOString()
      };
      setStore((current) => ({ ...current, leads: [lead, ...current.leads] }));
      addToast("Lead added", `${lead.name} is now in the conversion queue.`);
    }

    if (action.type === "convert-lead") {
      const lead = store.leads.find((item) => item.id === stringValue(values, "leadId"));
      const plan = store.plans.find((item) => item.id === stringValue(values, "planId")) ?? store.plans[0];
      if (lead) {
        const member: Member = {
          id: uid("mem"),
          branchId: lead.branchId,
          name: lead.name,
          email: `${lead.name.toLowerCase().replace(/\s+/g, ".")}@apexfit.demo`,
          phone: lead.phone,
          initials: initials(lead.name),
          status: "active",
          joinDate: DEMO_TODAY,
          renewalDate: addDays(DEMO_TODAY, plan.durationDays),
          pendingFees: plan.price,
          attendanceStreak: 0,
          attendanceRate: 0,
          lastVisit: `${DEMO_TODAY}T00:00:00+05:30`,
          trainerId: store.trainers.find((trainer) => trainer.branchId === lead.branchId)?.id ?? "",
          planId: plan.id,
          workoutTemplateId: store.workoutTemplates[0]?.id ?? "",
          weightKg: 72,
          startWeightKg: 72,
          goal: lead.goal,
          points: 0,
          rank: "Bronze",
          rating: 5,
          lateArrivals: 0,
          measurementAlert: true,
          notes: "Converted from lead. Schedule first assessment."
        };
        setStore((current) => ({
          ...current,
          members: [member, ...current.members],
          leads: current.leads.map((item) => (item.id === lead.id ? { ...item, status: "converted" } : item))
        }));
        saveMember(member);
        addToast("Lead converted", `${lead.name} is now an active member with ${currency(plan.price)} pending.`);
      }
    }

    if (action.type === "add-staff") {
      const role = stringValue(values, "role") as StaffRole;
      const staffUser: StaffUser = {
        id: uid("staff"),
        branchId,
        name: stringValue(values, "name"),
        email: stringValue(values, "email"),
        role,
        modules: modulesForRole(role),
        active: true
      };
      setStore((current) => ({ ...current, staffUsers: [staffUser, ...current.staffUsers] }));
      addToast("Staff user created", `${staffUser.name} can access ${staffUser.modules.join(", ")}.`);
    }

    if (action.type === "record-check-in") {
      const memberId = stringValue(values, "memberId");
      const member = store.members.find((item) => item.id === memberId);
      const duplicateToday = store.checkIns.some((checkIn) => checkIn.memberId === memberId && checkIn.timestamp.slice(0, 10) === DEMO_TODAY);
      if (member && duplicateToday) {
        addToast("Duplicate prevented", `${member.name} already has a check-in today.`);
      } else if (member) {
        const now = new Date();
        const late = now.getHours() >= 10;
        const checkIn: CheckIn = {
          id: uid("chk"),
          branchId: member.branchId,
          memberId,
          memberName: member.name,
          timestamp: `${DEMO_TODAY}T${String(Math.max(6, now.getHours())).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:00+05:30`,
          late,
          source: stringValue(values, "source") as CheckIn["source"]
        };
        setStore((current) => ({
          ...current,
          checkIns: [checkIn, ...current.checkIns],
          members: current.members.map((item) =>
            item.id === memberId
              ? {
                  ...item,
                  attendanceStreak: item.attendanceStreak + 1,
                  attendanceRate: Math.min(100, item.attendanceRate + 2),
                  lastVisit: checkIn.timestamp,
                  lateArrivals: late ? item.lateArrivals + 1 : item.lateArrivals
                }
              : item
          )
        }));
        saveCheckIn(checkIn);
        awardPoints(member.id, 10, "attendance");
        addToast("Check-in recorded", `${member.name} was marked present.`);
      }
    }

    setModal(null);
  }

  function handleFreezeMember(memberId: string) {
    const member = store.members.find((item) => item.id === memberId);
    const nextStatus = member?.status === "frozen" ? "active" : "frozen";
    setStore((current) => ({
      ...current,
      members: current.members.map((item) => (item.id === memberId ? { ...item, status: nextStatus } : item))
    }));
    updateMemberStatus(memberId, nextStatus);
    addToast(nextStatus === "frozen" ? "Membership frozen" : "Membership active", `${member?.name ?? "Member"} status changed.`);
  }

  function handleRemoveMember(memberId: string) {
    const member = store.members.find((item) => item.id === memberId);
    setStore((current) => ({
      ...current,
      members: current.members.filter((item) => item.id !== memberId),
      trainers: current.trainers.map((trainer) => ({
        ...trainer,
        assignedMemberIds: trainer.assignedMemberIds.filter((id) => id !== memberId)
      }))
    }));
    addToast("Member removed", `${member?.name ?? "Member"} was removed from the active roster.`);
  }

  function handleAssignTrainer(memberId: string, trainerId: string) {
    const member = store.members.find((item) => item.id === memberId);
    const trainer = store.trainers.find((item) => item.id === trainerId);
    setStore((current) => ({
      ...current,
      members: current.members.map((item) => (item.id === memberId ? { ...item, trainerId } : item)),
      trainers: current.trainers.map((item) => ({
        ...item,
        assignedMemberIds:
          item.id === trainerId
            ? Array.from(new Set([...item.assignedMemberIds, memberId]))
            : item.assignedMemberIds.filter((id) => id !== memberId)
      }))
    }));
    addToast("Trainer assigned", `${member?.name ?? "Member"} now trains with ${trainer?.name ?? "selected trainer"}.`);
  }

  function handleTogglePlan(planId: string) {
    const plan = store.plans.find((item) => item.id === planId);
    setStore((current) => ({
      ...current,
      plans: current.plans.map((item) => (item.id === planId ? { ...item, active: !item.active } : item))
    }));
    addToast("Plan updated", `${plan?.name ?? "Plan"} visibility changed.`);
  }

  function handleToggleStaff(staffId: string) {
    const staffUser = store.staffUsers.find((item) => item.id === staffId);
    setStore((current) => ({
      ...current,
      staffUsers: current.staffUsers.map((item) => (item.id === staffId ? { ...item, active: !item.active } : item))
    }));
    addToast("Staff permissions updated", `${staffUser?.name ?? "Staff user"} access changed.`);
  }

  function handleBranchChange(branchId: string) {
    const branch = store.branches.find((item) => item.id === branchId);
    setStore((current) => ({ ...current, settings: { ...current.settings, selectedBranchId: branchId } }));
    addToast("Branch switched", `${branch?.name ?? "Selected branch"} data loaded.`);
  }

  function awardPoints(
    memberId: string,
    points: number,
    field: keyof Pick<LeaderboardEntry, "attendance" | "consistency" | "strength" | "weightLoss" | "challenge">
  ) {
    setStore((current) => ({
      ...current,
      members: current.members.map((member) => {
        if (member.id !== memberId) return member;
        const total = member.points + points;
        return { ...member, points: total, rank: nextRank(total) };
      }),
      leaderboard: current.leaderboard.map((entry) => {
        if (entry.memberId !== memberId) return entry;
        const total = entry.points + points;
        return { ...entry, points: total, [field]: Math.min(100, entry[field] + Math.ceil(points / 4)), rank: nextRank(total) };
      })
    }));
  }

  if (!isAuthed) {
    return (
      <div className="app-root">
        <RoleLanding onLogin={handleLogin} />
        <ToastStack toasts={toasts} />
      </div>
    );
  }

  return (
    <div className="app-root">
      <AppShell role="owner" businessType={businessType} unreadCount={unreadCount} onLogout={handleLogout} onNotify={handleNotify}>
        {isLoadingDashboard ? <DashboardSkeleton /> : null}

        {!isLoadingDashboard && businessType === "solo" ? (
          <SoloTrainerDashboard
            members={scoped.members}
            payments={scoped.payments}
            checkIns={scoped.checkIns}
            leads={scoped.leads}
            workoutTemplates={scoped.workoutTemplates}
            metrics={metrics}
            charts={charts}
            onAction={openAction}
          />
        ) : null}

        {!isLoadingDashboard && businessType && businessType !== "solo" ? (
          <OwnerDashboard
            businessType={businessType}
            branches={store.branches}
            selectedBranchId={selectedBranchId}
            metrics={metrics}
            charts={charts}
            branchComparison={branchComparison}
            members={scoped.members}
            trainers={scoped.trainers}
            plans={scoped.plans}
            workoutTemplates={scoped.workoutTemplates}
            announcements={scoped.announcements}
            payments={scoped.payments}
            checkIns={scoped.checkIns}
            leads={scoped.leads}
            staffUsers={scoped.staffUsers}
            dailyPin={store.settings.dailyPin}
            onAction={openAction}
            onBranchChange={handleBranchChange}
            onFreezeMember={handleFreezeMember}
            onRemoveMember={handleRemoveMember}
            onAssignTrainer={handleAssignTrainer}
            onTogglePlan={handleTogglePlan}
            onToggleStaff={handleToggleStaff}
          />
        ) : null}

        {!isLoadingDashboard && !businessType ? <BusinessTypeModal onSelect={handleSelectBusinessType} /> : null}
      </AppShell>

      {modal ? (
        <ActionModal
          action={modal}
          members={scoped.members}
          trainers={scoped.trainers}
          plans={store.plans}
          workoutTemplates={store.workoutTemplates}
          branches={store.branches}
          leads={scoped.leads}
          businessType={businessType}
          selectedBranchId={selectedBranchId}
          dailyPin={store.settings.dailyPin}
          onClose={() => setModal(null)}
          onSubmit={handleActionSubmit}
        />
      ) : null}
      <ToastStack toasts={toasts} />
    </div>
  );
}

function BusinessTypeModal({ onSelect }: { onSelect: (businessType: BusinessType) => void }) {
  return (
    <Modal title="Select Business Type" onClose={() => undefined} locked>
      <div className="card-grid">
        {businessOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button className="role-card" key={option.type} type="button" onClick={() => onSelect(option.type)}>
              <div className="role-card-top">
                <span className="role-icon">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span className="badge">{businessTypeLabels[option.type]}</span>
              </div>
              <div>
                <h2>{option.title}</h2>
                <p>{option.body}</p>
              </div>
            </button>
          );
        })}
      </div>
      <div className="notification-card">
        <div className="row-main">
          <div className="person">
            <span className="avatar neon">
              <Building2 size={18} aria-hidden="true" />
            </span>
            <div>
              <strong>Saved locally</strong>
              <span>Change this later from the owner settings workflow.</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function DashboardSkeleton() {
  return (
    <main className="dashboard" aria-label="Loading dashboard">
      <section className="dashboard-hero skeleton-block" />
      <section className="metric-grid">
        {Array.from({ length: 6 }, (_, index) => (
          <div className="metric-card skeleton-block" key={index} />
        ))}
      </section>
      <section className="content-grid">
        <div className="chart-card skeleton-block" />
        <div className="chart-card skeleton-block" />
      </section>
    </main>
  );
}
