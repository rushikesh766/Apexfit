"use client";

import { ArrowRight, Dumbbell, Sparkles } from "lucide-react";

export function Hero() {
  const scrollToRoles = () => {
    document.getElementById("roles")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "5rem 1.5rem 3rem",
        background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "50%",
          height: "70%",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-10%",
          width: "40%",
          height: "50%",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            background: "var(--accent)",
            borderRadius: "999px",
            marginBottom: "1.5rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--accent-foreground)",
          }}
        >
          <Sparkles size={16} />
          <span>Trusted by 500+ Gyms</span>
        </div>

        {/* Main heading */}
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "1.5rem",
            color: "var(--foreground)",
            maxWidth: "800px",
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ display: "block" }}>The Fitness OS for</span>
          <span style={{ color: "var(--primary)" }}>Modern Gyms</span>
        </h1>

        {/* Subheading */}
        <p
          style={{
            fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
            color: "var(--muted)",
            maxWidth: "600px",
            marginBottom: "2rem",
            lineHeight: 1.6,
          }}
        >
          Streamline attendance tracking, member management, and trainer coordination 
          all in one beautiful platform built for fitness professionals.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          <button
            onClick={scrollToRoles}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2rem",
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              borderRadius: "var(--radius)",
              fontWeight: 600,
              fontSize: "1rem",
              boxShadow: "var(--shadow-md)",
              transition: "all 0.2s ease",
            }}
          >
            Get Started Free
            <ArrowRight size={18} />
          </button>
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2rem",
              background: "transparent",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              fontWeight: 600,
              fontSize: "1rem",
              transition: "all 0.2s ease",
            }}
          >
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "2rem",
            maxWidth: "600px",
          }}
        >
          {[
            { value: "50K+", label: "Active Members" },
            { value: "500+", label: "Gyms Onboarded" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "var(--primary)",
                  lineHeight: 1.2,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "var(--muted)",
                  marginTop: "0.25rem",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating icon decoration */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "80px",
          height: "80px",
          background: "var(--primary)",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "var(--shadow-lg)",
          transform: "rotate(12deg)",
        }}
      >
        <Dumbbell size={36} color="white" />
      </div>
    </section>
  );
}
