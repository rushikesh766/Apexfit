import {
  adminGyms,
  announcements,
  checkIns,
  featureToggles,
  leaderboard,
  measurementLogs,
  members,
  notifications,
  payments,
  plans,
  supportTickets,
  trainers,
  transformationPhotos,
  workoutTemplates
} from "./demo-data";
import type {
  Branch,
  BranchComparison,
  BusinessType,
  CheckIn,
  GymStore,
  Lead,
  Member,
  OwnerMetrics,
  Payment,
  StaffUser,
  StoreCharts,
  Trainer
} from "./types";
import { cloneDemo, daysBetween } from "./utils";

export const DEMO_TODAY = "2026-05-03";

export const businessTypeLabels: Record<BusinessType, string> = {
  solo: "Solo Trainer",
  "multi-trainer": "Multi Trainer Gym",
  "multi-branch": "Multi Branch Chain"
};

export const branches: Branch[] = [
  {
    id: "branch_baner",
    name: "APEXFIT Baner",
    city: "Pune",
    manager: "Rohan Malhotra",
    status: "active",
    targetRevenue: 850000
  },
  {
    id: "branch_wakad",
    name: "APEXFIT Wakad",
    city: "Pune",
    manager: "Maya Fernandes",
    status: "active",
    targetRevenue: 620000
  },
  {
    id: "branch_koregaon",
    name: "APEXFIT Koregaon Park",
    city: "Pune",
    manager: "Sahil Verma",
    status: "trial",
    targetRevenue: 720000
  }
];

export const leads: Lead[] = [
  {
    id: "lead_isha",
    branchId: "branch_baner",
    name: "Ishan Bendre",
    phone: "+91 98765 34120",
    source: "Instagram",
    goal: "12 week transformation",
    status: "trial",
    estimatedValue: 14999,
    createdAt: "2026-05-01T11:20:00+05:30"
  },
  {
    id: "lead_sara",
    branchId: "branch_wakad",
    name: "Sara Khan",
    phone: "+91 98765 88102",
    source: "Walk-in",
    goal: "Strength training after physiotherapy",
    status: "contacted",
    estimatedValue: 6499,
    createdAt: "2026-05-02T19:45:00+05:30"
  },
  {
    id: "lead_mohit",
    branchId: "branch_koregaon",
    name: "Mohit Jain",
    phone: "+91 98765 12019",
    source: "Referral",
    goal: "Couple yearly membership",
    status: "new",
    estimatedValue: 41998,
    createdAt: "2026-05-03T09:10:00+05:30"
  }
];

export const staffUsers: StaffUser[] = [
  {
    id: "staff_manager",
    branchId: "branch_baner",
    name: "Priya Nambiar",
    email: "manager@apexfit.demo",
    role: "Manager",
    modules: ["Members", "Fees", "Trainers", "Announcements", "Leads"],
    active: true
  },
  {
    id: "staff_frontdesk",
    branchId: "branch_baner",
    name: "Karan Shah",
    email: "frontdesk@apexfit.demo",
    role: "Receptionist",
    modules: ["Members", "Check-ins", "Leads"],
    active: true
  },
  {
    id: "staff_accounts",
    branchId: "branch_wakad",
    name: "Anaya Das",
    email: "accounts@apexfit.demo",
    role: "Accountant",
    modules: ["Fees", "Plans"],
    active: true
  }
];

const extraCheckIns: CheckIn[] = [
  {
    id: "chk_04",
    branchId: "branch_baner",
    memberId: "mem_aarav",
    memberName: "Aarav Mehta",
    timestamp: "2026-05-02T07:22:00+05:30",
    late: false,
    source: "pin"
  },
  {
    id: "chk_05",
    branchId: "branch_wakad",
    memberId: "mem_riya",
    memberName: "Riya Sharma",
    timestamp: "2026-05-01T18:40:00+05:30",
    late: false,
    source: "pin"
  },
  {
    id: "chk_06",
    branchId: "branch_baner",
    memberId: "mem_neha",
    memberName: "Neha Kapoor",
    timestamp: "2026-04-30T06:50:00+05:30",
    late: false,
    source: "frontdesk"
  },
  {
    id: "chk_07",
    branchId: "branch_koregaon",
    memberId: "mem_omkar",
    memberName: "Omkar Patil",
    timestamp: "2026-04-29T20:02:00+05:30",
    late: true,
    source: "trainer"
  },
  {
    id: "chk_08",
    branchId: "branch_wakad",
    memberId: "mem_vikram",
    memberName: "Vikram Rao",
    timestamp: "2026-04-28T09:15:00+05:30",
    late: false,
    source: "frontdesk"
  },
  {
    id: "chk_09",
    branchId: "branch_baner",
    memberId: "mem_neha",
    memberName: "Neha Kapoor",
    timestamp: "2026-05-02T06:42:00+05:30",
    late: false,
    source: "pin"
  }
];

export function createInitialStore(): GymStore {
  return {
    branches: cloneDemo(branches),
    members: cloneDemo(members),
    trainers: cloneDemo(trainers),
    payments: cloneDemo(payments),
    checkIns: [...cloneDemo(checkIns), ...cloneDemo(extraCheckIns)],
    plans: cloneDemo(plans),
    workoutTemplates: cloneDemo(workoutTemplates),
    announcements: cloneDemo(announcements),
    leads: cloneDemo(leads),
    staffUsers: cloneDemo(staffUsers),
    notifications: cloneDemo(notifications),
    leaderboard: cloneDemo(leaderboard),
    measurements: cloneDemo(measurementLogs),
    photos: cloneDemo(transformationPhotos),
    adminGyms: cloneDemo(adminGyms),
    supportTickets: cloneDemo(supportTickets),
    featureToggles: cloneDemo(featureToggles),
    settings: {
      businessType: null,
      selectedBranchId: "branch_baner",
      dailyPin: "4826"
    }
  };
}

export function scopeStore(store: GymStore, businessType: BusinessType | null, selectedBranchId: string) {
  const shouldScope = businessType === "multi-branch";
  const inBranch = <T extends { branchId: string }>(items: T[]) =>
    shouldScope ? items.filter((item) => item.branchId === selectedBranchId) : items;

  return {
    branches: store.branches,
    members: inBranch(store.members),
    trainers: inBranch(store.trainers),
    payments: inBranch(store.payments),
    checkIns: inBranch(store.checkIns),
    plans: store.plans,
    workoutTemplates: store.workoutTemplates,
    announcements: inBranch(store.announcements),
    leads: inBranch(store.leads),
    staffUsers: inBranch(store.staffUsers),
    notifications: store.notifications,
    leaderboard: store.leaderboard,
    measurements: inBranch(store.measurements),
    photos: inBranch(store.photos),
    adminGyms: store.adminGyms,
    supportTickets: store.supportTickets,
    featureToggles: store.featureToggles
  };
}

export function deriveOwnerMetrics(input: {
  members: Member[];
  payments: Payment[];
  checkIns: CheckIn[];
  leads: Lead[];
}): OwnerMetrics {
  const activeMembers = input.members.filter((member) => member.status === "active");
  const activeToday = new Set(
    input.checkIns.filter((checkIn) => checkIn.timestamp.slice(0, 10) === DEMO_TODAY).map((checkIn) => checkIn.memberId)
  ).size;
  const pendingFeesTotal = input.members.reduce((sum, member) => sum + member.pendingFees, 0);
  const monthlyRevenue = input.payments
    .filter((payment) => payment.collectedAt.slice(0, 7) === DEMO_TODAY.slice(0, 7))
    .reduce((sum, payment) => sum + payment.amount, 0);
  const expiringMemberships = input.members.filter((member) => {
    const daysLeft = daysBetween(DEMO_TODAY, member.renewalDate);
    return daysLeft >= 0 && daysLeft <= 14;
  }).length;
  const attendancePercent = activeMembers.length ? Math.round((activeToday / activeMembers.length) * 100) : 0;

  return {
    totalMembers: input.members.length,
    activeToday,
    pendingFeesTotal,
    pendingFeesCount: input.members.filter((member) => member.pendingFees > 0).length,
    monthlyRevenue,
    expiringMemberships,
    attendancePercent,
    leadsOpen: input.leads.filter((lead) => !["converted", "lost"].includes(lead.status)).length,
    sessionsToday: input.checkIns.filter((checkIn) => checkIn.timestamp.slice(0, 10) === DEMO_TODAY).length
  };
}

function lastSevenDays() {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(`${DEMO_TODAY}T00:00:00+05:30`);
    date.setDate(date.getDate() - (6 - index));
    return date.toISOString().slice(0, 10);
  });
}

export function deriveStoreCharts(input: {
  members: Member[];
  payments: Payment[];
  checkIns: CheckIn[];
  trainers: Trainer[];
}): StoreCharts {
  const days = lastSevenDays();
  const dailyCheckIns = days.map((day) => ({
    label: new Intl.DateTimeFormat("en-IN", { weekday: "short" }).format(new Date(day)),
    value: input.checkIns.filter((checkIn) => checkIn.timestamp.slice(0, 10) === day).length
  }));

  const monthLabels = ["Dec", "Jan", "Feb", "Mar", "Apr", "May"];
  const monthKeys = ["2025-12", "2026-01", "2026-02", "2026-03", "2026-04", "2026-05"];
  const revenueMonthly = monthKeys.map((month, index) => ({
    label: monthLabels[index],
    value: input.payments.filter((payment) => payment.collectedAt.slice(0, 7) === month).reduce((sum, payment) => sum + payment.amount, 0)
  }));

  const joinsVsChurn = [
    { label: "New joins", value: input.members.filter((member) => member.joinDate.slice(0, 7) === "2026-05").length },
    { label: "Renewed", value: input.members.filter((member) => member.pendingFees === 0 && member.status === "active").length },
    { label: "Churn risk", value: input.members.filter((member) => member.status === "inactive" || daysBetween(member.lastVisit, DEMO_TODAY) >= 7).length }
  ];

  const active = input.members.filter((member) => member.status === "active").length;
  const frozen = input.members.filter((member) => member.status === "frozen").length;
  const inactive = input.members.filter((member) => member.status === "inactive").length;
  const total = Math.max(input.members.length, 1);
  const retentionSegments = [
    { label: "Active", value: Math.round((active / total) * 100), color: "#d9ff3f" },
    { label: "Frozen", value: Math.round((frozen / total) * 100), color: "#7ef7d4" },
    { label: "Inactive", value: Math.round((inactive / total) * 100), color: "#ff6b6b" }
  ];

  const hours = [6, 9, 12, 17, 20];
  const dayIndexes = [1, 2, 3, 4, 5, 6, 0];
  const peakHours = hours.map((hour) =>
    dayIndexes.map((dayIndex) =>
      input.checkIns.filter((checkIn) => {
        const date = new Date(checkIn.timestamp);
        return date.getDay() === dayIndex && Math.abs(date.getHours() - hour) <= 1;
      }).length
    )
  );

  const paid = input.payments.filter((payment) => payment.collectedAt.slice(0, 7) === DEMO_TODAY.slice(0, 7)).reduce((sum, payment) => sum + payment.amount, 0);
  const pending = input.members.reduce((sum, member) => sum + member.pendingFees, 0);
  const recovered = paid + pending > 0 ? Math.round((paid / (paid + pending)) * 100) : 100;
  const paymentRecovery = [
    { label: "Recovered", value: recovered, color: "#d9ff3f" },
    { label: "Pending", value: 100 - recovered, color: "#ffcb66" }
  ];

  const trainerPerformance = input.trainers.map((trainer) => ({
    label: trainer.initials,
    value: Math.round((trainer.retentionRate + trainer.rating * 20 + Math.min(100, trainer.attendanceHandled / 5)) / 3)
  }));

  return { dailyCheckIns, revenueMonthly, joinsVsChurn, retentionSegments, peakHours, paymentRecovery, trainerPerformance };
}

export function deriveBranchComparison(store: GymStore): BranchComparison[] {
  return store.branches.map((branch) => {
    const branchMembers = store.members.filter((member) => member.branchId === branch.id);
    const branchPayments = store.payments.filter((payment) => payment.branchId === branch.id);
    const branchCheckIns = store.checkIns.filter((checkIn) => checkIn.branchId === branch.id);
    return {
      branchId: branch.id,
      branchName: branch.name,
      members: branchMembers.length,
      activeToday: new Set(branchCheckIns.filter((checkIn) => checkIn.timestamp.slice(0, 10) === DEMO_TODAY).map((checkIn) => checkIn.memberId)).size,
      revenue: branchPayments
        .filter((payment) => payment.collectedAt.slice(0, 7) === DEMO_TODAY.slice(0, 7))
        .reduce((sum, payment) => sum + payment.amount, 0),
      pending: branchMembers.reduce((sum, member) => sum + member.pendingFees, 0),
      leads: store.leads.filter((lead) => lead.branchId === branch.id && lead.status !== "converted").length
    };
  });
}
