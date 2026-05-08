"use client";

import {
  BarChart3,
  Bell,
  CreditCard,
  Shield,
  Smartphone,
  Users,
  Zap,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: <BarChart3 size={24} />,
    title: "Advanced Analytics",
    description: "Track member attendance, revenue, and growth with real-time dashboards and detailed reports.",
  },
  {
    icon: <Users size={24} />,
    title: "Member Management",
    description: "Easily manage memberships, track renewals, and maintain detailed member profiles.",
  },
  {
    icon: <CreditCard size={24} />,
    title: "Payment Processing",
    description: "Automated billing, payment reminders, and multiple payment method support.",
  },
  {
    icon: <Bell size={24} />,
    title: "Smart Notifications",
    description: "Automated reminders for renewals, class schedules, and personalized member updates.",
  },
  {
    icon: <Smartphone size={24} />,
    title: "Mobile First",
    description: "Optimized for mobile devices. Access your gym data anytime, anywhere.",
  },
  {
    icon: <Shield size={24} />,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with encrypted data storage and regular backups.",
  },
  {
    icon: <Zap size={24} />,
    title: "Quick Setup",
    description: "Get started in minutes. No complex setup or technical knowledge required.",
  },
  {
    icon: <Clock size={24} />,
    title: "24/7 Support",
    description: "Dedicated support team available round the clock to help you succeed.",
  },
];

export function Features() {
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
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
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
            <Zap size={16} />
            Features
          </span>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800,
              marginBottom: "1rem",
              color: "var(--foreground)",
            }}
          >
            Everything You Need
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--muted)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Powerful features designed to help you run your gym efficiently and grow your business.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              style={{
                background: "var(--card)",
                borderRadius: "var(--radius)",
                padding: "1.5rem",
                boxShadow: "var(--shadow)",
                border: "1px solid var(--border)",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "var(--accent)",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                  color: "var(--primary)",
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontSize: "1.0625rem",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                  color: "var(--foreground)",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
