"use client";

import { useMemo, useState } from "react";
import { Camera, Check, Crown, Dumbbell, Flame, Medal, MessageSquareText, RefreshCcw, Ruler, Trophy, WalletCards } from "lucide-react";
import { LineChart } from "@/components/charts/LineChart";
import { Pill } from "@/components/ui/Pill";
import { Progress } from "@/components/ui/Progress";
import type {
  CheckIn,
  GymPlan,
  LeaderboardEntry,
  MeasurementLog,
  Member,
  Payment,
  Trainer,
  TransformationPhoto,
  WorkoutTemplate
} from "@/lib/types";
import { currency, daysBetween, formatDate, formatTime } from "@/lib/utils";

type LeaderboardTab = "attendance" | "consistency" | "strength" | "weightLoss" | "challenge";

type StudentDashboardProps = {
  member: Member;
  trainer: Trainer;
  plan: GymPlan;
  workoutTemplate: WorkoutTemplate;
  leaderboard: LeaderboardEntry[];
  measurements: MeasurementLog[];
  photos: TransformationPhoto[];
  payments: Payment[];
  checkIns: CheckIn[];
  completedExercises: string[];
  checkedInToday: boolean;
  onCheckIn: (pin: string) => void;
  onToggleExercise: (exerciseId: string) => void;
  onCompleteWorkout: () => void;
  onRenew: () => void;
};

const leaderboardTabs: Array<{ id: LeaderboardTab; label: string }> = [
  { id: "attendance", label: "Attendance" },
  { id: "consistency", label: "Consistency" },
  { id: "strength", label: "Strength" },
  { id: "weightLoss", label: "Weight Loss" },
  { id: "challenge", label: "Monthly Challenge" }
];

export function StudentDashboard({
  member,
  trainer,
  plan,
  workoutTemplate,
  leaderboard,
  measurements,
  photos,
  payments,
  checkIns,
  completedExercises,
  checkedInToday,
  onCheckIn,
  onToggleExercise,
  onCompleteWorkout,
  onRenew
}: StudentDashboardProps) {
  const [pin, setPin] = useState("");
  const [leaderboardTab, setLeaderboardTab] = useState<LeaderboardTab>("attendance");
  const memberMeasurements = measurements.filter((measurement) => measurement.memberId === member.id);
  const memberPhotos = photos.filter((photo) => photo.memberId === member.id);
  const memberPayments = payments.filter((payment) => payment.memberId === member.id);
  const memberCheckIns = checkIns.filter((checkIn) => checkIn.memberId === member.id);
  const daysLeft = daysBetween("2026-05-03", member.renewalDate);
  const completionPercent = Math.round((completedExercises.length / Math.max(workoutTemplate.exercises.length, 1)) * 100);
  const ranked = useMemo(
    () => [...leaderboard].sort((a, b) => b[leaderboardTab] - a[leaderboardTab]),
    [leaderboard, leaderboardTab]
  );
  const weightGraph = memberMeasurements.map((measurement) => ({
    label: formatDate(measurement.date).slice(0, 6),
    value: measurement.weightKg
  }));

  return (
    <main className="dashboard">
      <section className="dashboard-hero">
        <div className="hero-title">
          <span className="badge">Member Home</span>
          <h1>Welcome back, {member.name.split(" ")[0]}.</h1>
          <p>Current streak, membership status, today&apos;s trainer, workouts, progress, leaderboard, and coach notes.</p>
        </div>
        <div className="glass-card">
          <div className="row-main">
            <div className="person">
              <span className="avatar neon">{member.initials}</span>
              <div>
                <strong>{member.name}</strong>
                <span>Today&apos;s trainer: {trainer.name}</span>
              </div>
            </div>
            <Pill tone={daysLeft <= 3 ? "warning" : "default"}>{daysLeft} days left</Pill>
          </div>
          <div className="mini-stats">
            <span className="mini-stat">
              <span>Current streak</span>
              <strong>
                <Flame size={14} aria-hidden="true" /> {member.attendanceStreak} days
              </strong>
            </span>
            <span className="mini-stat">
              <span>Membership</span>
              <strong>{member.status}</strong>
            </span>
            <span className="mini-stat">
              <span>Rank</span>
              <strong>{member.rank}</strong>
            </span>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <article className={`glass-card ${checkedInToday ? "success-burst" : ""}`}>
          <div className="card-header">
            <div>
              <h3>Check-in</h3>
              <p>Enter the daily gym PIN. One successful check-in is allowed per day.</p>
            </div>
            <Pill tone={checkedInToday ? "default" : "warning"}>{checkedInToday ? "Marked" : "Waiting"}</Pill>
          </div>
          <div className="pin-pad">
            <input
              aria-label="Daily gym PIN"
              inputMode="numeric"
              maxLength={4}
              value={pin}
              onChange={(event) => setPin(event.target.value.replace(/\D/g, "").slice(0, 4))}
            />
            <button
              className="primary-button"
              type="button"
              disabled={checkedInToday || pin.length !== 4}
              onClick={() => {
                onCheckIn(pin);
                setPin("");
              }}
            >
              Check in
            </button>
          </div>
          {memberCheckIns[0] ? (
            <span className="fine-print">
              Latest check-in: {formatDate(memberCheckIns[0].timestamp)} at {formatTime(memberCheckIns[0].timestamp)}
            </span>
          ) : null}
        </article>

        <article className="glass-card">
          <div className="card-header">
            <div>
              <h3>Today Workout</h3>
              <p>{workoutTemplate.name} - sets, reps, and working weight.</p>
            </div>
            <Pill tone="cyan">{completionPercent}%</Pill>
          </div>
          <Progress value={completionPercent} />
          <div className="stack-list">
            {workoutTemplate.exercises.map((exercise) => {
              const done = completedExercises.includes(exercise.id);
              return (
                <button
                  className={`exercise-row ${done ? "done" : ""}`}
                  type="button"
                  key={exercise.id}
                  onClick={() => onToggleExercise(exercise.id)}
                >
                  <span className="check-circle">
                    {done ? <Check size={15} aria-hidden="true" /> : <Dumbbell size={14} aria-hidden="true" />}
                  </span>
                  <span>
                    <strong>{exercise.name}</strong>
                    <span className="fine-print">
                      {exercise.sets} sets - {exercise.reps}
                    </span>
                  </span>
                  <strong>{exercise.weight}</strong>
                </button>
              );
            })}
          </div>
          <button className="primary-button" type="button" disabled={completionPercent < 100} onClick={onCompleteWorkout}>
            Mark workout completed
          </button>
        </article>
      </section>

      <section className="content-grid">
        <article className="table-card">
          <div className="card-header">
            <div>
              <h3>Leaderboard</h3>
              <p>Points: check-in +10, workout +20, 7-day streak +50, challenge win +100.</p>
            </div>
            <Trophy size={19} color="var(--neon)" aria-hidden="true" />
          </div>
          <div className="tab-row" role="tablist" aria-label="Leaderboard category">
            {leaderboardTabs.map((tab) => (
              <button
                className={`tab-button ${leaderboardTab === tab.id ? "active" : ""}`}
                key={tab.id}
                type="button"
                onClick={() => setLeaderboardTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="stack-list">
            {ranked.map((entry, index) => (
              <article className="leader-row" key={entry.memberId}>
                <div className="row-main">
                  <div className="person">
                    <span className="avatar gold">{index + 1}</span>
                    <div>
                      <strong>{entry.name}</strong>
                      <span>{entry.points} total points</span>
                    </div>
                  </div>
                  <span className="rank-pill">
                    <Medal size={14} aria-hidden="true" />
                    {entry.rank}
                  </span>
                </div>
                <Progress value={entry[leaderboardTab]} />
              </article>
            ))}
          </div>
        </article>

        <article className="table-card">
          <div className="card-header">
            <div>
              <h3>Progress</h3>
              <p>Weight graph, measurements, PR records, and gallery.</p>
            </div>
            <Ruler size={19} color="var(--neon)" aria-hidden="true" />
          </div>
          <LineChart data={weightGraph.length ? weightGraph : [{ label: "Now", value: member.weightKg }]} color="var(--neon-2)" />
          <div className="stack-list">
            {memberMeasurements
              .slice()
              .reverse()
              .map((measurement) => (
                <article className="member-row" key={measurement.id}>
                  <div className="row-main">
                    <strong>{formatDate(measurement.date)}</strong>
                    <Pill tone="cyan">{measurement.pr}</Pill>
                  </div>
                  <div className="mini-stats">
                    <span className="mini-stat">
                      <span>Weight</span>
                      <strong>{measurement.weightKg}kg</strong>
                    </span>
                    <span className="mini-stat">
                      <span>Chest</span>
                      <strong>{measurement.chestCm}cm</strong>
                    </span>
                    <span className="mini-stat">
                      <span>Waist</span>
                      <strong>{measurement.waistCm}cm</strong>
                    </span>
                  </div>
                </article>
              ))}
          </div>
          <div className="gallery">
            {memberPhotos.map((photo) => (
              <div className="photo-tile" key={photo.id}>
                <Camera size={18} color="var(--neon)" aria-hidden="true" />
                <strong>{photo.label}</strong>
                <span className="fine-print">{formatDate(photo.date)}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="two-col">
        <article className="glass-card">
          <div className="card-header">
            <div>
              <h3>Trainer Message</h3>
              <p>Coach notes, diet reminder, and motivation for today.</p>
            </div>
            <MessageSquareText size={19} color="var(--neon)" aria-hidden="true" />
          </div>
          <p className="muted">{member.notes}</p>
          <Pill tone="cyan">Hydrate well and keep 2 reps in reserve on your final set.</Pill>
        </article>

        <article className="glass-card">
          <div className="card-header">
            <div>
              <h3>Membership</h3>
              <p>Days left, renewal button, and payment history.</p>
            </div>
            <WalletCards size={19} color="var(--neon)" aria-hidden="true" />
          </div>
          <div className="mini-stats">
            <span className="mini-stat">
              <span>Plan</span>
              <strong>{plan.name}</strong>
            </span>
            <span className="mini-stat">
              <span>Renewal</span>
              <strong>{formatDate(member.renewalDate)}</strong>
            </span>
            <span className="mini-stat">
              <span>Days left</span>
              <strong>{daysLeft}</strong>
            </span>
          </div>
          <button className="primary-button" type="button" onClick={onRenew}>
            <RefreshCcw size={16} aria-hidden="true" />
            Renew membership
          </button>
          <div className="stack-list">
            {memberPayments.map((payment) => (
              <article className="member-row" key={payment.id}>
                <div className="row-main">
                  <strong>{currency(payment.amount)}</strong>
                  <Pill tone="cyan">{payment.method}</Pill>
                </div>
                <span className="fine-print">{formatDate(payment.collectedAt)}</span>
              </article>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
