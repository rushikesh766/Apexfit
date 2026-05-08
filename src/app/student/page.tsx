"use client";

import { useState } from "react";
import { Calendar, Check, CheckCircle, ChevronRight, Dumbbell, Flame, Medal, MessageSquare, Trophy, Zap } from "lucide-react";

// Static mock data
const MEMBER = {
  name: "Aarav Mehta",
  initials: "AM",
  streak: 12,
  points: 1450,
  rank: "Gold",
  renewalDate: "2026-06-15",
  daysLeft: 43,
  attendanceRate: 87,
  trainer: "Raj Patel",
};

const LEADERBOARD = [
  { id: "1", name: "Priya Singh", initials: "PS", points: 1820, rank: "Platinum", streak: 28 },
  { id: "2", name: "Aarav Mehta", initials: "AM", points: 1450, rank: "Gold", streak: 12 },
  { id: "3", name: "Riya Sharma", initials: "RS", points: 1280, rank: "Gold", streak: 9 },
  { id: "4", name: "Vikram Rao", initials: "VR", points: 980, rank: "Silver", streak: 5 },
  { id: "5", name: "Neha Kapoor", initials: "NK", points: 720, rank: "Silver", streak: 3 },
];

const TODAY_WORKOUT = {
  name: "Push Day - Chest & Triceps",
  exercises: [
    { id: "1", name: "Bench Press", sets: 4, reps: "8-10", completed: false },
    { id: "2", name: "Incline Dumbbell Press", sets: 3, reps: "10-12", completed: false },
    { id: "3", name: "Cable Flyes", sets: 3, reps: "12-15", completed: false },
    { id: "4", name: "Tricep Pushdown", sets: 3, reps: "12-15", completed: false },
    { id: "5", name: "Overhead Tricep Extension", sets: 3, reps: "10-12", completed: false },
  ],
};

const ANNOUNCEMENTS = [
  { id: "1", title: "Gym closed on Sunday", body: "The gym will be closed on May 10th for maintenance.", date: "May 5" },
  { id: "2", title: "New Yoga classes available", body: "Starting next week, we are offering morning yoga sessions at 6 AM.", date: "May 3" },
];

const ATTENDANCE_CALENDAR = [
  { day: 1, status: "present" },
  { day: 2, status: "present" },
  { day: 3, status: "present" },
  { day: 4, status: "absent" },
  { day: 5, status: "present" },
  { day: 6, status: "present" },
  { day: 7, status: "present" },
  { day: 8, status: "future" },
  { day: 9, status: "future" },
  { day: 10, status: "future" },
];

export default function StudentDashboard() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [pin, setPin] = useState("");
  const [exercises, setExercises] = useState(TODAY_WORKOUT.exercises);

  const handleCheckIn = () => {
    if (pin.length === 4) {
      setCheckedIn(true);
      setPin("");
    }
  };

  const toggleExercise = (id: string) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, completed: !ex.completed } : ex))
    );
  };

  const completedCount = exercises.filter((ex) => ex.completed).length;
  const completionPercent = Math.round((completedCount / exercises.length) * 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Welcome & Streak Card */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--primary) 0%, #1d4ed8 100%)",
          borderRadius: "var(--radius)",
          padding: "1.5rem",
          color: "white",
        }}
      >
        <p style={{ fontSize: "0.875rem", opacity: 0.9, marginBottom: "0.25rem" }}>Welcome back,</p>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>{MEMBER.name.split(" ")[0]}</h2>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Flame size={20} />
            <div>
              <p style={{ fontSize: "1.25rem", fontWeight: 700 }}>{MEMBER.streak}</p>
              <p style={{ fontSize: "0.6875rem", opacity: 0.9 }}>Day Streak</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Zap size={20} />
            <div>
              <p style={{ fontSize: "1.25rem", fontWeight: 700 }}>{MEMBER.points}</p>
              <p style={{ fontSize: "0.6875rem", opacity: 0.9 }}>Points</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Medal size={20} />
            <div>
              <p style={{ fontSize: "1.25rem", fontWeight: 700 }}>{MEMBER.rank}</p>
              <p style={{ fontSize: "0.6875rem", opacity: 0.9 }}>Rank</p>
            </div>
          </div>
        </div>
      </section>

      {/* Check-in Card */}
      <section
        style={{
          background: checkedIn ? "#f0fdf4" : "var(--card)",
          border: checkedIn ? "2px solid var(--success)" : "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "1.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <CheckCircle size={20} color={checkedIn ? "var(--success)" : "var(--muted)"} />
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--foreground)" }}>Daily Check-in</h3>
          </div>
          {checkedIn && (
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--success)",
                background: "#dcfce7",
                padding: "0.25rem 0.75rem",
                borderRadius: "9999px",
              }}
            >
              Checked In
            </span>
          )}
        </div>
        {!checkedIn ? (
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="Enter 4-digit PIN"
              style={{
                flex: 1,
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                fontSize: "1rem",
                letterSpacing: "0.2em",
                textAlign: "center",
                background: "var(--background)",
                color: "var(--foreground)",
              }}
            />
            <button
              type="button"
              onClick={handleCheckIn}
              disabled={pin.length !== 4}
              style={{
                padding: "0.75rem 1.25rem",
                borderRadius: "var(--radius-sm)",
                background: pin.length === 4 ? "var(--primary)" : "var(--secondary)",
                color: pin.length === 4 ? "white" : "var(--muted)",
                fontWeight: 600,
                fontSize: "0.875rem",
                border: "none",
                cursor: pin.length === 4 ? "pointer" : "not-allowed",
              }}
            >
              Check In
            </button>
          </div>
        ) : (
          <p style={{ fontSize: "0.875rem", color: "var(--success)" }}>
            You have checked in for today. Keep up the great work!
          </p>
        )}
      </section>

      {/* Today's Workout */}
      <section
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "1.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Dumbbell size={20} color="var(--primary)" />
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--foreground)" }}>Today&apos;s Workout</h3>
          </div>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--primary)",
              background: "var(--accent)",
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px",
            }}
          >
            {completionPercent}%
          </span>
        </div>
        <p style={{ fontSize: "0.8125rem", color: "var(--muted)", marginBottom: "1rem" }}>{TODAY_WORKOUT.name}</p>
        
        {/* Progress bar */}
        <div
          style={{
            height: "6px",
            background: "var(--secondary)",
            borderRadius: "9999px",
            marginBottom: "1rem",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${completionPercent}%`,
              background: "var(--primary)",
              borderRadius: "9999px",
              transition: "width 0.3s ease",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {exercises.map((exercise) => (
            <button
              key={exercise.id}
              type="button"
              onClick={() => toggleExercise(exercise.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem",
                borderRadius: "var(--radius-sm)",
                background: exercise.completed ? "#f0fdf4" : "var(--secondary)",
                border: "none",
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
                transition: "all 0.15s ease",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  border: exercise.completed ? "none" : "2px solid var(--border)",
                  background: exercise.completed ? "var(--success)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {exercise.completed && <Check size={14} color="white" />}
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: exercise.completed ? "var(--muted)" : "var(--foreground)",
                    textDecoration: exercise.completed ? "line-through" : "none",
                  }}
                >
                  {exercise.name}
                </p>
                <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                  {exercise.sets} sets × {exercise.reps}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Attendance Calendar Mini */}
      <section
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "1.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Calendar size={20} color="var(--primary)" />
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--foreground)" }}>This Week</h3>
          </div>
          <a
            href="/student/calendar"
            style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            View all <ChevronRight size={14} />
          </a>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {ATTENDANCE_CALENDAR.slice(0, 7).map((day) => (
            <div
              key={day.day}
              style={{
                flex: 1,
                aspectRatio: "1",
                borderRadius: "var(--radius-sm)",
                background:
                  day.status === "present"
                    ? "var(--success)"
                    : day.status === "absent"
                    ? "#fecaca"
                    : "var(--secondary)",
                color: day.status === "present" ? "white" : day.status === "absent" ? "#991b1b" : "var(--muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8125rem",
                fontWeight: 600,
              }}
            >
              {day.day}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "1rem", marginTop: "0.75rem", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: "var(--success)" }} />
            <span style={{ fontSize: "0.6875rem", color: "var(--muted)" }}>Present</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: "#fecaca" }} />
            <span style={{ fontSize: "0.6875rem", color: "var(--muted)" }}>Absent</span>
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "1.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Trophy size={20} color="#f59e0b" />
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--foreground)" }}>Leaderboard</h3>
          </div>
          <a
            href="/student/leaderboard"
            style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            View all <ChevronRight size={14} />
          </a>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {LEADERBOARD.slice(0, 5).map((member, index) => (
            <div
              key={member.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.625rem",
                borderRadius: "var(--radius-sm)",
                background: member.name === MEMBER.name ? "var(--accent)" : "var(--secondary)",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background:
                    index === 0 ? "#fbbf24" : index === 1 ? "#9ca3af" : index === 2 ? "#d97706" : "var(--muted)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                }}
              >
                {index + 1}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)" }}>{member.name}</p>
                <p style={{ fontSize: "0.6875rem", color: "var(--muted)" }}>{member.rank}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--foreground)" }}>{member.points}</p>
                <p style={{ fontSize: "0.6875rem", color: "var(--muted)" }}>pts</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Announcements */}
      <section
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
      </section>
    </div>
  );
}
