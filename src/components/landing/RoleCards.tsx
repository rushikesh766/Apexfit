"use client";

import { User, Users, Building2, ArrowRight, ChevronRight } from "lucide-react";

interface RoleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  badge?: string;
  comingSoon?: boolean;
}

function RoleCard({ icon, title, description, features, badge, comingSoon }: RoleCardProps) {
  return (
    <div
      style={{
        background: "var(--card)",
        borderRadius: "var(--radius)",
        padding: "1.5rem",
        boxShadow: "var(--shadow)",
        border: "1px solid var(--border)",
        transition: "all 0.3s ease",
        cursor: comingSoon ? "default" : "pointer",
        opacity: comingSoon ? 0.7 : 1,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {badge && (
        <span
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            padding: "0.25rem 0.75rem",
            background: comingSoon ? "var(--secondary)" : "var(--accent)",
            color: comingSoon ? "var(--muted)" : "var(--accent-foreground)",
            borderRadius: "999px",
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          {badge}
        </span>
      )}

      <div
        style={{
          width: "56px",
          height: "56px",
          background: "var(--accent)",
          borderRadius: "var(--radius-sm)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.25rem",
          color: "var(--primary)",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          marginBottom: "0.5rem",
          color: "var(--foreground)",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: "0.9375rem",
          color: "var(--muted)",
          marginBottom: "1.25rem",
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>

      <ul style={{ listStyle: "none", marginBottom: "1.5rem" }}>
        {features.map((feature, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.875rem",
              color: "var(--muted)",
              marginBottom: "0.5rem",
            }}
          >
            <ChevronRight size={14} color="var(--primary)" />
            {feature}
          </li>
        ))}
      </ul>

      {!comingSoon && (
        <button
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.25rem",
            background: "var(--primary)",
            color: "var(--primary-foreground)",
            borderRadius: "var(--radius-sm)",
            fontWeight: 600,
            fontSize: "0.875rem",
            width: "100%",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
        >
          Continue as {title}
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}

export function RoleCards() {
  const roles = [
    {
      icon: <User size={28} />,
      title: "Student",
      description: "Track your fitness journey, check-in to sessions, and compete on leaderboards.",
      features: [
        "Daily attendance tracking",
        "Personal workout logs",
        "Leaderboard rankings",
        "Progress analytics",
      ],
    },
    {
      icon: <Users size={28} />,
      title: "Trainer",
      description: "Manage your clients, track attendance, and deliver personalized workout plans.",
      features: [
        "Client management",
        "Attendance tracking",
        "Workout plan builder",
        "Performance reports",
      ],
    },
    {
      icon: <Building2 size={28} />,
      title: "Owner",
      description: "Complete gym operations control with analytics, staff management, and billing.",
      features: [
        "Multi-branch support",
        "Revenue analytics",
        "Staff management",
        "Member billing",
      ],
    },
  ];

  return (
    <section
      id="roles"
      style={{
        padding: "5rem 1.5rem",
        background: "var(--secondary)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800,
              marginBottom: "1rem",
              color: "var(--foreground)",
            }}
          >
            Choose Your Role
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--muted)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            APEXFIT adapts to your needs whether you{"'"}re a gym member, trainer, or owner.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {roles.map((role) => (
            <RoleCard key={role.title} {...role} />
          ))}
        </div>

        {/* Owner Flow Options */}
        <div
          style={{
            marginTop: "3rem",
            padding: "2rem",
            background: "var(--card)",
            borderRadius: "var(--radius)",
            boxShadow: "var(--shadow)",
            border: "1px solid var(--border)",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              marginBottom: "1.5rem",
              color: "var(--foreground)",
              textAlign: "center",
            }}
          >
            Owner Setup Options
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {[
              { label: "Solo Trainer Gym", available: true },
              { label: "Multi Trainer Gym", available: true },
              { label: "Multi Branch", available: false },
            ].map((option) => (
              <div
                key={option.label}
                style={{
                  padding: "1.25rem",
                  background: option.available ? "var(--accent)" : "var(--secondary)",
                  borderRadius: "var(--radius-sm)",
                  textAlign: "center",
                  border: `1px solid ${option.available ? "var(--primary)" : "var(--border)"}`,
                  opacity: option.available ? 1 : 0.6,
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    color: option.available ? "var(--accent-foreground)" : "var(--muted)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {option.label}
                </div>
                {!option.available && (
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--muted)",
                    }}
                  >
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
