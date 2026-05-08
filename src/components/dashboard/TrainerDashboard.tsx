"use client";

import { useMemo, useState } from "react";
import {
  BellRing,
  Camera,
  ClipboardPenLine,
  Dumbbell,
  MessageSquareText,
  NotebookPen,
  Ruler,
  Scale,
  TimerReset,
  UsersRound
} from "lucide-react";
import { LineChart } from "@/components/charts/LineChart";
import { ActionButton } from "@/components/ui/ActionButton";
import { MetricCard } from "@/components/ui/MetricCard";
import { Pill } from "@/components/ui/Pill";
import { Progress } from "@/components/ui/Progress";
import { Tabs } from "@/components/ui/Tabs";
import type { ActionType, MeasurementLog, Member, Trainer, TransformationPhoto, WorkoutTemplate } from "@/lib/types";
import { daysBetween, formatDate, formatTime } from "@/lib/utils";

type TrainerTab = "home" | "students" | "progress" | "messages";

type TrainerDashboardProps = {
  members: Member[];
  trainer: Trainer;
  workoutTemplates: WorkoutTemplate[];
  measurements: MeasurementLog[];
  photos: TransformationPhoto[];
  onAction: (action: ActionType, context?: string) => void;
};

const tabs: Array<{ id: TrainerTab; label: string }> = [
  { id: "home", label: "Home" },
  { id: "students", label: "Students" },
  { id: "progress", label: "Progress" },
  { id: "messages", label: "Messages" }
];

export function TrainerDashboard({ members, trainer, workoutTemplates, measurements, photos, onAction }: TrainerDashboardProps) {
  const [activeTab, setActiveTab] = useState<TrainerTab>("home");
  const assignedMembers = useMemo(
    () => members.filter((member) => trainer.assignedMemberIds.includes(member.id)),
    [members, trainer.assignedMemberIds]
  );
  const pendingCheckIns = assignedMembers.filter((member) => daysBetween(member.lastVisit, "2026-05-03") >= 1);
  const progressAlerts = assignedMembers.filter((member) => member.measurementAlert);
  const attendanceSeries = assignedMembers.map((member) => ({
    label: member.initials,
    value: member.attendanceRate
  }));

  return (
    <main className="dashboard">
      <section className="dashboard-hero">
        <div className="hero-title">
          <span className="badge">Trainer Workspace</span>
          <h1>{trainer.name}&apos;s coaching board.</h1>
          <p>
            Track today&apos;s sessions, pending check-ins, workout updates, measurements, transformation photos, and
            client reminders.
          </p>
        </div>
        <div className="glass-card">
          <div className="row-main">
            <div>
              <span className="fine-print">Client retention</span>
              <div className="metric-value">{trainer.retentionRate}%</div>
            </div>
            <Pill tone="cyan">{trainer.rating.toFixed(1)} rating</Pill>
          </div>
          <Progress value={trainer.retentionRate} />
        </div>
      </section>

      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === "home" ? (
        <>
          <section className="metric-grid">
            <MetricCard label="My Students" value={String(assignedMembers.length)} trend="assigned members" icon={UsersRound} />
            <MetricCard label="Today Sessions" value={String(trainer.sessionsToday)} trend="5 completed" icon={TimerReset} />
            <MetricCard label="Pending Check-ins" value={String(pendingCheckIns.length)} trend="needs nudge" icon={BellRing} direction="down" />
            <MetricCard label="Progress Alerts" value={String(progressAlerts.length)} trend="measurements due" icon={Scale} direction="down" />
          </section>
          <section className="quick-grid">
            <ActionButton icon={ClipboardPenLine} label="Create workout plan" onClick={() => onAction("assign-workout")} />
            <ActionButton icon={NotebookPen} label="Assign diet notes" onClick={() => onAction("diet-note", assignedMembers[0]?.id)} />
            <ActionButton icon={BellRing} label="Send reminders" onClick={() => onAction("trainer-reminder", trainer.id)} />
            <ActionButton icon={Ruler} label="Record measurements" onClick={() => onAction("measurements", assignedMembers[0]?.id)} />
            <ActionButton icon={Camera} label="Upload transformation photos" onClick={() => onAction("transformation-photo", assignedMembers[0]?.id)} />
          </section>
          <section className="content-grid">
            <article className="chart-card">
              <div className="card-header">
                <div>
                  <h3>Student attendance graph</h3>
                  <p>Current attendance rate across assigned clients.</p>
                </div>
              </div>
              <LineChart data={attendanceSeries.length ? attendanceSeries : [{ label: "NA", value: 0 }]} color="var(--neon-2)" />
            </article>
            <article className="table-card">
              <h3>Progress alerts</h3>
              <div className="stack-list">
                {progressAlerts.map((member) => (
                  <article className="notification-card" key={member.id}>
                    <div className="row-main">
                      <div className="person">
                        <span className="avatar gold">{member.initials}</span>
                        <div>
                          <strong>{member.name}</strong>
                          <span>{member.goal}</span>
                        </div>
                      </div>
                      <Pill tone="warning">Due</Pill>
                    </div>
                    <button className="ghost-button" type="button" onClick={() => onAction("measurements", member.id)}>
                      Record now
                    </button>
                  </article>
                ))}
              </div>
            </article>
          </section>
        </>
      ) : null}

      {activeTab === "students" ? (
        <section className="table-card">
          <div className="section-title">
            <div>
              <h2>Assigned Members</h2>
              <p>Each card shows streak, weight progress, last visit, and current plan.</p>
            </div>
            <Pill>{assignedMembers.length} active</Pill>
          </div>
          <div className="card-grid">
            {assignedMembers.map((member) => {
              const template = workoutTemplates.find((item) => item.id === member.workoutTemplateId);
              const weightLost = Math.max(0, member.startWeightKg - member.weightKg);
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
                    <Pill tone={member.status === "active" ? "default" : "danger"}>{member.status}</Pill>
                  </div>
                  <div className="mini-stats">
                    <span className="mini-stat">
                      <span>Streak</span>
                      <strong>{member.attendanceStreak} days</strong>
                    </span>
                    <span className="mini-stat">
                      <span>Weight progress</span>
                      <strong>{weightLost.toFixed(1)}kg</strong>
                    </span>
                    <span className="mini-stat">
                      <span>Last visit</span>
                      <strong>{formatTime(member.lastVisit)}</strong>
                    </span>
                  </div>
                  <Progress value={member.attendanceRate} />
                  <span className="fine-print">Current plan: {template?.name ?? "Custom plan"}</span>
                  <div className="row-meta">
                    <button className="tiny-button" type="button" onClick={() => onAction("assign-workout", member.id)}>
                      <Dumbbell size={14} aria-hidden="true" />
                      Workout
                    </button>
                    <button className="tiny-button" type="button" onClick={() => onAction("diet-note", member.id)}>
                      <MessageSquareText size={14} aria-hidden="true" />
                      Diet
                    </button>
                    <button className="tiny-button" type="button" onClick={() => onAction("measurements", member.id)}>
                      <Ruler size={14} aria-hidden="true" />
                      Measure
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      {activeTab === "progress" ? (
        <section className="content-grid">
          <article className="table-card">
            <h2>Measurement Logs</h2>
            <div className="stack-list">
              {measurements
                .filter((log) => assignedMembers.some((member) => member.id === log.memberId))
                .slice()
                .reverse()
                .map((log) => {
                  const member = members.find((item) => item.id === log.memberId);
                  return (
                    <article className="member-row" key={log.id}>
                      <div className="row-main">
                        <strong>{member?.name ?? "Member"}</strong>
                        <Pill tone="cyan">{formatDate(log.date)}</Pill>
                      </div>
                      <div className="mini-stats">
                        <span className="mini-stat">
                          <span>Weight</span>
                          <strong>{log.weightKg}kg</strong>
                        </span>
                        <span className="mini-stat">
                          <span>Waist</span>
                          <strong>{log.waistCm}cm</strong>
                        </span>
                        <span className="mini-stat">
                          <span>PR</span>
                          <strong>{log.pr}</strong>
                        </span>
                      </div>
                    </article>
                  );
                })}
            </div>
          </article>
          <article className="table-card">
            <h2>Transformation Photos</h2>
            <div className="gallery">
              {photos
                .filter((photo) => assignedMembers.some((member) => member.id === photo.memberId))
                .map((photo) => {
                  const member = members.find((item) => item.id === photo.memberId);
                  return (
                    <div className="photo-tile" key={photo.id}>
                      <strong>{member?.name}</strong>
                      <span className="fine-print">
                        {photo.label} - {formatDate(photo.date)}
                      </span>
                    </div>
                  );
                })}
            </div>
            <button className="ghost-button" type="button" onClick={() => onAction("transformation-photo", assignedMembers[0]?.id)}>
              <Camera size={15} aria-hidden="true" />
              Upload new photo
            </button>
          </article>
        </section>
      ) : null}

      {activeTab === "messages" ? (
        <section className="table-card">
          <div className="section-title">
            <div>
              <h2>Coach Notes and Reminders</h2>
              <p>Send diet reminders, plan updates, and session nudges to assigned members.</p>
            </div>
            <button className="primary-button" type="button" onClick={() => onAction("trainer-reminder", trainer.id)}>
              Send all
            </button>
          </div>
          <div className="stack-list">
            {assignedMembers.map((member) => (
              <article className="notification-card" key={member.id}>
                <div className="row-main">
                  <div className="person">
                    <span className="avatar">{member.initials}</span>
                    <div>
                      <strong>{member.name}</strong>
                      <span>{member.notes}</span>
                    </div>
                  </div>
                  <button className="tiny-button" type="button" onClick={() => onAction("diet-note", member.id)}>
                    Update note
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
