export type Role = "owner";
export type TrainerMode = "solo" | "staff";
export type BusinessType = "solo" | "multi-trainer" | "multi-branch";
export type PaymentMethod = "Cash" | "UPI" | "Card";
export type MemberStatus = "active" | "inactive" | "frozen";
export type Rank = "Bronze" | "Silver" | "Gold" | "Platinum" | "Master";
export type StaffRole = "Manager" | "Receptionist" | "Trainer" | "Accountant";

export type Branch = {
  id: string;
  name: string;
  city: string;
  manager: string;
  status: "active" | "trial" | "paused";
  targetRevenue: number;
};

export type Member = {
  id: string;
  branchId: string;
  name: string;
  email: string;
  phone: string;
  initials: string;
  status: MemberStatus;
  joinDate: string;
  renewalDate: string;
  pendingFees: number;
  attendanceStreak: number;
  attendanceRate: number;
  lastVisit: string;
  trainerId: string;
  planId: string;
  workoutTemplateId: string;
  weightKg: number;
  startWeightKg: number;
  goal: string;
  points: number;
  rank: Rank;
  rating: number;
  lateArrivals: number;
  measurementAlert: boolean;
  notes: string;
};

export type Trainer = {
  id: string;
  branchId: string;
  name: string;
  email: string;
  initials: string;
  specialty: string;
  assignedMemberIds: string[];
  retentionRate: number;
  attendanceHandled: number;
  rating: number;
  plansNeedUpdate: number;
  sessionsToday: number;
};

export type GymPlan = {
  id: string;
  name: string;
  durationDays: number;
  price: number;
  offer: string;
  category: "Membership" | "Personal Training";
  active: boolean;
};

export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight: string;
  completed?: boolean;
};

export type WorkoutTemplate = {
  id: string;
  name: string;
  goal: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  exercises: Exercise[];
  assignedCount: number;
};

export type Announcement = {
  id: string;
  branchId: string;
  title: string;
  body: string;
  audience: "All" | "Owners" | "Trainers" | "Students";
  sentAt: string;
  status: "sent" | "scheduled";
};

export type Payment = {
  id: string;
  branchId: string;
  memberId: string;
  memberName: string;
  amount: number;
  method: PaymentMethod;
  collectedAt: string;
};

export type CheckIn = {
  id: string;
  branchId: string;
  memberId: string;
  memberName: string;
  timestamp: string;
  late: boolean;
  source: "pin" | "frontdesk" | "trainer";
};

export type LeaderboardEntry = {
  memberId: string;
  name: string;
  points: number;
  attendance: number;
  consistency: number;
  strength: number;
  weightLoss: number;
  challenge: number;
  rank: Rank;
};

export type MeasurementLog = {
  id: string;
  branchId: string;
  memberId: string;
  date: string;
  weightKg: number;
  chestCm: number;
  waistCm: number;
  hipCm: number;
  pr: string;
};

export type TransformationPhoto = {
  id: string;
  branchId: string;
  memberId: string;
  label: string;
  date: string;
  tone: "green" | "cyan" | "gold";
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  audience: "Owner" | "Trainer" | "Student";
  createdAt: string;
  read: boolean;
};

export type AdminGym = {
  id: string;
  name: string;
  city: string;
  owner: string;
  subscription: "Starter" | "Growth" | "Pro" | "Enterprise";
  monthlyRevenue: number;
  status: "active" | "trial" | "paused";
  banned: boolean;
};

export type SupportTicket = {
  id: string;
  gymName: string;
  title: string;
  priority: "Low" | "Medium" | "High";
  status: "open" | "resolved";
};

export type FeatureToggle = {
  id: string;
  name: string;
  enabled: boolean;
};

export type Lead = {
  id: string;
  branchId: string;
  name: string;
  phone: string;
  source: "Walk-in" | "Instagram" | "Referral" | "Website";
  goal: string;
  status: "new" | "contacted" | "trial" | "converted" | "lost";
  estimatedValue: number;
  createdAt: string;
};

export type StaffUser = {
  id: string;
  branchId: string;
  name: string;
  email: string;
  role: StaffRole;
  modules: string[];
  active: boolean;
};

export type GymSettings = {
  businessType: BusinessType | null;
  selectedBranchId: string;
  dailyPin: string;
};

export type GymStore = {
  branches: Branch[];
  members: Member[];
  trainers: Trainer[];
  payments: Payment[];
  checkIns: CheckIn[];
  plans: GymPlan[];
  workoutTemplates: WorkoutTemplate[];
  announcements: Announcement[];
  leads: Lead[];
  staffUsers: StaffUser[];
  notifications: NotificationItem[];
  leaderboard: LeaderboardEntry[];
  measurements: MeasurementLog[];
  photos: TransformationPhoto[];
  adminGyms: AdminGym[];
  supportTickets: SupportTicket[];
  featureToggles: FeatureToggle[];
  settings: GymSettings;
};

export type BranchComparison = {
  branchId: string;
  branchName: string;
  members: number;
  activeToday: number;
  revenue: number;
  pending: number;
  leads: number;
};

export type OwnerMetrics = {
  totalMembers: number;
  activeToday: number;
  pendingFeesTotal: number;
  pendingFeesCount: number;
  monthlyRevenue: number;
  expiringMemberships: number;
  attendancePercent: number;
  leadsOpen: number;
  sessionsToday: number;
};

export type StoreCharts = {
  dailyCheckIns: Array<{ label: string; value: number }>;
  revenueMonthly: Array<{ label: string; value: number }>;
  joinsVsChurn: Array<{ label: string; value: number }>;
  retentionSegments: Array<{ label: string; value: number; color: string }>;
  peakHours: number[][];
  paymentRecovery: Array<{ label: string; value: number; color: string }>;
  trainerPerformance: Array<{ label: string; value: number }>;
};

export type ActionType =
  | "add-member"
  | "add-trainer"
  | "announcement"
  | "pin"
  | "assign-workout"
  | "collect-fee"
  | "diet-note"
  | "measurements"
  | "transformation-photo"
  | "trainer-reminder"
  | "plan"
  | "support-ticket"
  | "add-lead"
  | "convert-lead"
  | "add-staff"
  | "record-check-in";
