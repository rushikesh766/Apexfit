"use client";

import { Trophy, Medal, TrendingUp, Flame } from "lucide-react";

interface LeaderEntry {
  rank: number;
  name: string;
  points: number;
  streak: number;
  trend: "up" | "down" | "same";
}

const leaderboardData: LeaderEntry[] = [
  { rank: 1, name: "Alex Johnson", points: 2840, streak: 45, trend: "up" },
  { rank: 2, name: "Sarah Chen", points: 2720, streak: 32, trend: "up" },
  { rank: 3, name: "Mike Rodriguez", points: 2580, streak: 28, trend: "same" },
  { rank: 4, name: "Emma Wilson", points: 2450, streak: 21, trend: "up" },
  { rank: 5, name: "James Park", points: 2340, streak: 19, trend: "down" },
];

function getRankBadge(rank: number) {
  const badges: Record<number, { bg: string; color: string; icon: React.ReactNode }> = {
    1: { bg: "#fef3c7", color: "#d97706", icon: <Trophy size={16} /> },
    2: { bg: "#e5e7eb", color: "#6b7280", icon: <Medal size={16} /> },
    3: { bg: "#fed7aa", color: "#ea580c", icon: <Medal size={16} /> },
  };
  return badges[rank];
}

export function LeaderboardPreview() {
  return (
    <section
      style={{
        padding: "5rem 1.5rem",
        background: "var(--background)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          {/* Text content */}
          <div style={{ textAlign: "center" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                background: "var(--accent)",
                borderRadius: "999px",
                marginBottom: "1rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--accent-foreground)",
              }}
            >
              <Trophy size={16} />
              Leaderboard
            </span>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 800,
                marginBottom: "1rem",
                color: "var(--foreground)",
              }}
            >
              Gamify Your Fitness Journey
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "var(--muted)",
                maxWidth: "600px",
                margin: "0 auto 2rem",
                lineHeight: 1.6,
              }}
            >
              Compete with fellow gym members, earn points for attendance, and climb the ranks. 
              Stay motivated with streaks and achievements.
            </p>
          </div>

          {/* Leaderboard card */}
          <div
            style={{
              background: "var(--card)",
              borderRadius: "var(--radius)",
              padding: "1.5rem",
              boxShadow: "var(--shadow-lg)",
              border: "1px solid var(--border)",
              maxWidth: "600px",
              margin: "0 auto",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "var(--foreground)",
                }}
              >
                This Week{"'"}s Top Members
              </h3>
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  background: "var(--secondary)",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  color: "var(--muted)",
                }}
              >
                Live
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {leaderboardData.map((entry) => {
                const badge = getRankBadge(entry.rank);
                return (
                  <div
                    key={entry.rank}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1rem",
                      background: entry.rank <= 3 ? "var(--secondary)" : "transparent",
                      borderRadius: "var(--radius-sm)",
                      border: entry.rank <= 3 ? "none" : "1px solid var(--border)",
                    }}
                  >
                    {/* Rank */}
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "var(--radius-sm)",
                        background: badge?.bg || "var(--secondary)",
                        color: badge?.color || "var(--muted)",
                        fontWeight: 700,
                      }}
                    >
                      {badge?.icon || entry.rank}
                    </div>

                    {/* Name and stats */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontWeight: 600,
                          color: "var(--foreground)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {entry.name}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          fontSize: "0.8125rem",
                          color: "var(--muted)",
                        }}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <Flame size={14} color="#f97316" />
                          {entry.streak} day streak
                        </span>
                      </div>
                    </div>

                    {/* Points */}
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontWeight: 700,
                          color: "var(--primary)",
                          fontSize: "1.125rem",
                        }}
                      >
                        {entry.points.toLocaleString()}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--muted)",
                        }}
                      >
                        points
                      </div>
                    </div>

                    {/* Trend */}
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: entry.trend === "up" ? "#22c55e" : entry.trend === "down" ? "#ef4444" : "#9ca3af",
                      }}
                    >
                      <TrendingUp
                        size={16}
                        style={{
                          transform: entry.trend === "down" ? "rotate(180deg)" : "none",
                          opacity: entry.trend === "same" ? 0.3 : 1,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
