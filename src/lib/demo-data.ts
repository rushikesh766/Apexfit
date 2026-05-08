import type {
  AdminGym,
  Announcement,
  CheckIn,
  FeatureToggle,
  GymPlan,
  LeaderboardEntry,
  MeasurementLog,
  Member,
  NotificationItem,
  Payment,
  SupportTicket,
  Trainer,
  TransformationPhoto,
  WorkoutTemplate
} from "./types";

export const ownerMetrics = {
  totalMembers: 328,
  activeToday: 84,
  pendingFees: 18,
  monthlyRevenue: 742500,
  expiringMemberships: 27,
  attendancePercent: 76
};

export const dailyCheckIns = [
  { label: "Mon", value: 68 },
  { label: "Tue", value: 74 },
  { label: "Wed", value: 88 },
  { label: "Thu", value: 82 },
  { label: "Fri", value: 93 },
  { label: "Sat", value: 112 },
  { label: "Sun", value: 57 }
];

export const monthlyRevenue = [
  { label: "Nov", value: 520000 },
  { label: "Dec", value: 590000 },
  { label: "Jan", value: 655000 },
  { label: "Feb", value: 610000 },
  { label: "Mar", value: 705000 },
  { label: "Apr", value: 742500 }
];

export const retentionSegments = [
  { label: "Renewed", value: 68, color: "#d9ff3f" },
  { label: "At Risk", value: 21, color: "#ffcb66" },
  { label: "Churned", value: 11, color: "#ff6b6b" }
];

export const peakHours = [
  [19, 24, 31, 36, 42, 55, 37],
  [28, 36, 48, 45, 52, 61, 39],
  [42, 58, 66, 62, 70, 86, 44],
  [35, 49, 54, 59, 64, 73, 41],
  [24, 31, 39, 44, 50, 62, 35]
];

export const members: Member[] = [
  {
    id: "mem_aarav",
    branchId: "branch_baner",
    name: "Aarav Mehta",
    email: "aarav@apexfit.demo",
    phone: "+91 98765 11024",
    initials: "AM",
    status: "active",
    joinDate: "2025-08-12",
    renewalDate: "2026-05-28",
    pendingFees: 0,
    attendanceStreak: 12,
    attendanceRate: 91,
    lastVisit: "2026-05-03T07:36:00+05:30",
    trainerId: "trn_isha",
    planId: "plan_growth_yearly",
    workoutTemplateId: "wrk_strength",
    weightKg: 74.2,
    startWeightKg: 81.4,
    goal: "Lean strength",
    points: 1320,
    rank: "Platinum",
    rating: 4.8,
    lateArrivals: 1,
    measurementAlert: false,
    notes: "Increase deadlift volume by 5kg this week."
  },
  {
    id: "mem_riya",
    branchId: "branch_wakad",
    name: "Riya Sharma",
    email: "riya@apexfit.demo",
    phone: "+91 98765 88442",
    initials: "RS",
    status: "active",
    joinDate: "2025-11-03",
    renewalDate: "2026-05-12",
    pendingFees: 1499,
    attendanceStreak: 7,
    attendanceRate: 84,
    lastVisit: "2026-05-02T18:22:00+05:30",
    trainerId: "trn_kabir",
    planId: "plan_pt_12",
    workoutTemplateId: "wrk_women_fat_loss",
    weightKg: 62.8,
    startWeightKg: 69.5,
    goal: "Fat loss and mobility",
    points: 920,
    rank: "Gold",
    rating: 4.7,
    lateArrivals: 0,
    measurementAlert: true,
    notes: "Prefers evening sessions. Diet reminder every Monday."
  },
  {
    id: "mem_vikram",
    branchId: "branch_wakad",
    name: "Vikram Rao",
    email: "vikram@apexfit.demo",
    phone: "+91 98765 44091",
    initials: "VR",
    status: "inactive",
    joinDate: "2025-05-21",
    renewalDate: "2026-04-29",
    pendingFees: 999,
    attendanceStreak: 0,
    attendanceRate: 41,
    lastVisit: "2026-04-22T20:15:00+05:30",
    trainerId: "trn_dev",
    planId: "plan_quarterly",
    workoutTemplateId: "wrk_beginner",
    weightKg: 88.1,
    startWeightKg: 91.7,
    goal: "Return to consistent training",
    points: 240,
    rank: "Bronze",
    rating: 4.1,
    lateArrivals: 3,
    measurementAlert: true,
    notes: "Absent 11 days. Needs retention call."
  },
  {
    id: "mem_neha",
    branchId: "branch_baner",
    name: "Neha Kapoor",
    email: "neha@apexfit.demo",
    phone: "+91 98765 30481",
    initials: "NK",
    status: "active",
    joinDate: "2026-01-08",
    renewalDate: "2026-07-08",
    pendingFees: 0,
    attendanceStreak: 18,
    attendanceRate: 96,
    lastVisit: "2026-05-03T06:58:00+05:30",
    trainerId: "trn_isha",
    planId: "plan_half_yearly",
    workoutTemplateId: "wrk_ppl",
    weightKg: 57.4,
    startWeightKg: 61.0,
    goal: "Strength and posture",
    points: 1710,
    rank: "Platinum",
    rating: 4.9,
    lateArrivals: 0,
    measurementAlert: false,
    notes: "Strong candidate for May consistency challenge."
  },
  {
    id: "mem_omkar",
    branchId: "branch_koregaon",
    name: "Omkar Patil",
    email: "omkar@apexfit.demo",
    phone: "+91 98765 77510",
    initials: "OP",
    status: "frozen",
    joinDate: "2025-09-18",
    renewalDate: "2026-06-18",
    pendingFees: 0,
    attendanceStreak: 0,
    attendanceRate: 63,
    lastVisit: "2026-04-25T09:15:00+05:30",
    trainerId: "trn_kabir",
    planId: "plan_yearly",
    workoutTemplateId: "wrk_weight_loss",
    weightKg: 96.8,
    startWeightKg: 104.2,
    goal: "Weight loss",
    points: 660,
    rank: "Silver",
    rating: 4.4,
    lateArrivals: 2,
    measurementAlert: false,
    notes: "Membership frozen until travel ends."
  }
];

export const trainers: Trainer[] = [
  {
    id: "trn_isha",
    branchId: "branch_baner",
    name: "Isha Menon",
    email: "isha@apexfit.demo",
    initials: "IM",
    specialty: "Strength and body recomposition",
    assignedMemberIds: ["mem_aarav", "mem_neha"],
    retentionRate: 94,
    attendanceHandled: 412,
    rating: 4.9,
    plansNeedUpdate: 1,
    sessionsToday: 9
  },
  {
    id: "trn_kabir",
    branchId: "branch_wakad",
    name: "Kabir Sethi",
    email: "kabir@apexfit.demo",
    initials: "KS",
    specialty: "Fat loss and conditioning",
    assignedMemberIds: ["mem_riya", "mem_omkar"],
    retentionRate: 88,
    attendanceHandled: 366,
    rating: 4.7,
    plansNeedUpdate: 2,
    sessionsToday: 7
  },
  {
    id: "trn_dev",
    branchId: "branch_koregaon",
    name: "Dev Nair",
    email: "dev@apexfit.demo",
    initials: "DN",
    specialty: "Beginners and mobility",
    assignedMemberIds: ["mem_vikram"],
    retentionRate: 81,
    attendanceHandled: 215,
    rating: 4.5,
    plansNeedUpdate: 3,
    sessionsToday: 5
  }
];

export const plans: GymPlan[] = [
  {
    id: "plan_monthly",
    name: "Monthly Membership",
    durationDays: 30,
    price: 2499,
    offer: "Free body scan",
    category: "Membership",
    active: true
  },
  {
    id: "plan_quarterly",
    name: "Quarterly",
    durationDays: 90,
    price: 6499,
    offer: "Save 13%",
    category: "Membership",
    active: true
  },
  {
    id: "plan_half_yearly",
    name: "Half Yearly",
    durationDays: 180,
    price: 11999,
    offer: "Nutrition consult included",
    category: "Membership",
    active: true
  },
  {
    id: "plan_yearly",
    name: "Yearly",
    durationDays: 365,
    price: 20999,
    offer: "Two PT sessions free",
    category: "Membership",
    active: true
  },
  {
    id: "plan_growth_yearly",
    name: "Transformation Annual",
    durationDays: 365,
    price: 29999,
    offer: "Monthly progress shoot",
    category: "Personal Training",
    active: true
  },
  {
    id: "plan_pt_12",
    name: "Personal Training 12",
    durationDays: 45,
    price: 14999,
    offer: "12 coached sessions",
    category: "Personal Training",
    active: true
  }
];

export const workoutTemplates: WorkoutTemplate[] = [
  {
    id: "wrk_ppl",
    name: "Push Pull Legs",
    goal: "Hypertrophy split for consistent lifters",
    difficulty: "Intermediate",
    assignedCount: 82,
    exercises: [
      { id: "ex_bench", name: "Bench Press", sets: 4, reps: "8-10", weight: "55kg" },
      { id: "ex_row", name: "Seated Cable Row", sets: 4, reps: "10-12", weight: "45kg" },
      { id: "ex_legpress", name: "Leg Press", sets: 4, reps: "12", weight: "140kg" }
    ]
  },
  {
    id: "wrk_weight_loss",
    name: "Weight Loss Engine",
    goal: "Full-body conditioning with steady progression",
    difficulty: "Beginner",
    assignedCount: 69,
    exercises: [
      { id: "ex_tread", name: "Incline Walk", sets: 1, reps: "18 min", weight: "Zone 2" },
      { id: "ex_kettle", name: "Kettlebell Swing", sets: 4, reps: "15", weight: "12kg" },
      { id: "ex_sled", name: "Sled Push", sets: 6, reps: "20m", weight: "Light" }
    ]
  },
  {
    id: "wrk_beginner",
    name: "Beginner Reset",
    goal: "Technique, mobility, and confidence",
    difficulty: "Beginner",
    assignedCount: 54,
    exercises: [
      { id: "ex_goblet", name: "Goblet Squat", sets: 3, reps: "12", weight: "10kg" },
      { id: "ex_lat", name: "Lat Pulldown", sets: 3, reps: "12", weight: "30kg" },
      { id: "ex_plank", name: "Plank", sets: 3, reps: "40 sec", weight: "Bodyweight" }
    ]
  },
  {
    id: "wrk_women_fat_loss",
    name: "Women Fat Loss",
    goal: "Glute strength, core, and low-impact conditioning",
    difficulty: "Intermediate",
    assignedCount: 46,
    exercises: [
      { id: "ex_hip", name: "Hip Thrust", sets: 4, reps: "10", weight: "50kg" },
      { id: "ex_step", name: "Step Ups", sets: 3, reps: "12/leg", weight: "8kg" },
      { id: "ex_bike", name: "Air Bike Intervals", sets: 8, reps: "20 sec", weight: "Hard" }
    ]
  },
  {
    id: "wrk_strength",
    name: "Strength 5x5",
    goal: "Squat, press, hinge progression",
    difficulty: "Advanced",
    assignedCount: 37,
    exercises: [
      { id: "ex_squat", name: "Back Squat", sets: 5, reps: "5", weight: "92.5kg" },
      { id: "ex_dead", name: "Deadlift", sets: 3, reps: "5", weight: "125kg" },
      { id: "ex_ohp", name: "Overhead Press", sets: 5, reps: "5", weight: "42.5kg" }
    ]
  }
];

export const announcements: Announcement[] = [
  {
    id: "ann_close",
    branchId: "branch_baner",
    title: "Sunday recovery hours",
    body: "The gym is open 7 AM to 1 PM today. Evening slots move to Monday.",
    audience: "All",
    sentAt: "2026-05-03T07:00:00+05:30",
    status: "sent"
  },
  {
    id: "ann_offer",
    branchId: "branch_baner",
    title: "Summer Lean Challenge",
    body: "Register before 8 May and get a free body composition scan.",
    audience: "Students",
    sentAt: "2026-05-02T18:15:00+05:30",
    status: "sent"
  }
];

export const payments: Payment[] = [
  {
    id: "pay_01",
    branchId: "branch_baner",
    memberId: "mem_neha",
    memberName: "Neha Kapoor",
    amount: 11999,
    method: "UPI",
    collectedAt: "2026-05-03T07:12:00+05:30"
  },
  {
    id: "pay_02",
    branchId: "branch_baner",
    memberId: "mem_aarav",
    memberName: "Aarav Mehta",
    amount: 29999,
    method: "Card",
    collectedAt: "2026-05-02T20:04:00+05:30"
  },
  {
    id: "pay_03",
    branchId: "branch_wakad",
    memberId: "mem_riya",
    memberName: "Riya Sharma",
    amount: 1499,
    method: "Cash",
    collectedAt: "2026-05-01T19:42:00+05:30"
  }
];

export const checkIns: CheckIn[] = [
  {
    id: "chk_01",
    branchId: "branch_baner",
    memberId: "mem_aarav",
    memberName: "Aarav Mehta",
    timestamp: "2026-05-03T07:36:00+05:30",
    late: false,
    source: "pin"
  },
  {
    id: "chk_02",
    branchId: "branch_baner",
    memberId: "mem_neha",
    memberName: "Neha Kapoor",
    timestamp: "2026-05-03T06:58:00+05:30",
    late: false,
    source: "pin"
  },
  {
    id: "chk_03",
    branchId: "branch_wakad",
    memberId: "mem_riya",
    memberName: "Riya Sharma",
    timestamp: "2026-05-02T18:22:00+05:30",
    late: false,
    source: "trainer"
  }
];

export const leaderboard: LeaderboardEntry[] = [
  {
    memberId: "mem_neha",
    name: "Neha Kapoor",
    points: 1710,
    attendance: 96,
    consistency: 94,
    strength: 82,
    weightLoss: 74,
    challenge: 88,
    rank: "Platinum"
  },
  {
    memberId: "mem_aarav",
    name: "Aarav Mehta",
    points: 1320,
    attendance: 91,
    consistency: 89,
    strength: 92,
    weightLoss: 61,
    challenge: 79,
    rank: "Platinum"
  },
  {
    memberId: "mem_riya",
    name: "Riya Sharma",
    points: 920,
    attendance: 84,
    consistency: 83,
    strength: 68,
    weightLoss: 86,
    challenge: 72,
    rank: "Gold"
  },
  {
    memberId: "mem_omkar",
    name: "Omkar Patil",
    points: 660,
    attendance: 63,
    consistency: 58,
    strength: 54,
    weightLoss: 81,
    challenge: 49,
    rank: "Silver"
  },
  {
    memberId: "mem_vikram",
    name: "Vikram Rao",
    points: 240,
    attendance: 41,
    consistency: 32,
    strength: 44,
    weightLoss: 38,
    challenge: 22,
    rank: "Bronze"
  }
];

export const measurementLogs: MeasurementLog[] = [
  {
    id: "msr_01",
    branchId: "branch_baner",
    memberId: "mem_aarav",
    date: "2026-01-03",
    weightKg: 81.4,
    chestCm: 100,
    waistCm: 91,
    hipCm: 98,
    pr: "Bench 50kg"
  },
  {
    id: "msr_02",
    branchId: "branch_baner",
    memberId: "mem_aarav",
    date: "2026-03-03",
    weightKg: 77.6,
    chestCm: 101,
    waistCm: 86,
    hipCm: 97,
    pr: "Deadlift 115kg"
  },
  {
    id: "msr_03",
    branchId: "branch_baner",
    memberId: "mem_aarav",
    date: "2026-05-03",
    weightKg: 74.2,
    chestCm: 102,
    waistCm: 82,
    hipCm: 96,
    pr: "Deadlift 125kg"
  },
  {
    id: "msr_04",
    branchId: "branch_wakad",
    memberId: "mem_riya",
    date: "2026-02-03",
    weightKg: 69.5,
    chestCm: 92,
    waistCm: 82,
    hipCm: 99,
    pr: "Hip thrust 40kg"
  },
  {
    id: "msr_05",
    branchId: "branch_wakad",
    memberId: "mem_riya",
    date: "2026-05-01",
    weightKg: 62.8,
    chestCm: 90,
    waistCm: 74,
    hipCm: 96,
    pr: "Hip thrust 50kg"
  }
];

export const transformationPhotos: TransformationPhoto[] = [
  { id: "pho_01", branchId: "branch_baner", memberId: "mem_aarav", label: "Start", date: "2026-01-03", tone: "gold" },
  { id: "pho_02", branchId: "branch_baner", memberId: "mem_aarav", label: "Current", date: "2026-05-03", tone: "green" },
  { id: "pho_03", branchId: "branch_wakad", memberId: "mem_riya", label: "Start", date: "2026-02-03", tone: "cyan" },
  { id: "pho_04", branchId: "branch_wakad", memberId: "mem_riya", label: "Current", date: "2026-05-01", tone: "green" }
];

export const notifications: NotificationItem[] = [
  {
    id: "not_owner_01",
    title: "12 fees pending",
    body: "High-value dues total ₹48,460 this week.",
    audience: "Owner",
    createdAt: "2026-05-03T08:00:00+05:30",
    read: false
  },
  {
    id: "not_owner_02",
    title: "5 members absent",
    body: "Retention queue updated for members absent 7+ days.",
    audience: "Owner",
    createdAt: "2026-05-03T08:08:00+05:30",
    read: false
  },
  {
    id: "not_trainer_01",
    title: "3 plans need update",
    body: "Refresh old workouts before evening sessions.",
    audience: "Trainer",
    createdAt: "2026-05-03T08:10:00+05:30",
    read: false
  },
  {
    id: "not_student_01",
    title: "Push workout today",
    body: "Bench press and shoulder work are ready.",
    audience: "Student",
    createdAt: "2026-05-03T06:30:00+05:30",
    read: false
  },
  {
    id: "not_student_02",
    title: "Membership expires in 3 days",
    body: "Renew from the membership card to keep your streak active.",
    audience: "Student",
    createdAt: "2026-05-03T09:00:00+05:30",
    read: false
  }
];

export const adminGyms: AdminGym[] = [
  {
    id: "gym_apex_pune",
    name: "ApexFit Baner",
    city: "Pune",
    owner: "Rohan Malhotra",
    subscription: "Pro",
    monthlyRevenue: 1499,
    status: "active",
    banned: false
  },
  {
    id: "gym_atom_mumbai",
    name: "Atom Strength Club",
    city: "Mumbai",
    owner: "Maya Fernandes",
    subscription: "Growth",
    monthlyRevenue: 999,
    status: "trial",
    banned: false
  },
  {
    id: "gym_core_delhi",
    name: "Core Lab Fitness",
    city: "Delhi",
    owner: "Sahil Verma",
    subscription: "Enterprise",
    monthlyRevenue: 6400,
    status: "active",
    banned: false
  }
];

export const supportTickets: SupportTicket[] = [
  {
    id: "tic_01",
    gymName: "ApexFit Baner",
    title: "UPI webhook delayed for two payments",
    priority: "High",
    status: "open"
  },
  {
    id: "tic_02",
    gymName: "Atom Strength Club",
    title: "Trainer invite email bounced",
    priority: "Medium",
    status: "open"
  },
  {
    id: "tic_03",
    gymName: "Core Lab Fitness",
    title: "Need enterprise feature audit export",
    priority: "Low",
    status: "resolved"
  }
];

export const featureToggles: FeatureToggle[] = [
  { id: "feat_ai_retention", name: "AI retention risk scoring", enabled: true },
  { id: "feat_upi_auto", name: "UPI auto reconciliation", enabled: true },
  { id: "feat_challenges", name: "Monthly challenge engine", enabled: true },
  { id: "feat_white_label", name: "White label branding", enabled: false }
];

export const monetizationPlans = [
  { name: "Starter", price: "₹499", bestFor: "Single desk gyms", features: "Members, fees, PIN check-in" },
  { name: "Growth", price: "₹999", bestFor: "Trainer-led gyms", features: "Workouts, analytics, push" },
  { name: "Pro", price: "₹1499", bestFor: "Multi-trainer teams", features: "Staff stats, retention, admin" },
  { name: "Enterprise", price: "Custom", bestFor: "Chains and franchises", features: "Multi-branch controls" }
];
