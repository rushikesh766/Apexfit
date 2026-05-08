"use client";

import { ArrowRight, Dumbbell } from "lucide-react";

export function CTA() {
  const scrollToRoles = () => {
    document.getElementById("roles")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      style={{
        padding: "5rem 1.5rem",
        background: "var(--primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          right: "-20%",
          width: "60%",
          height: "150%",
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "-10%",
          width: "40%",
          height: "80%",
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 60%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            background: "rgba(255, 255, 255, 0.15)",
            borderRadius: "var(--radius)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
          }}
        >
          <Dumbbell size={40} color="white" />
        </div>

        <h2
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 800,
            marginBottom: "1rem",
            color: "white",
            lineHeight: 1.2,
          }}
        >
          Ready to Transform Your Gym?
        </h2>

        <p
          style={{
            fontSize: "1.125rem",
            color: "rgba(255, 255, 255, 0.85)",
            maxWidth: "550px",
            margin: "0 auto 2rem",
            lineHeight: 1.6,
          }}
        >
          Join thousands of fitness professionals who trust APEXFIT to manage their gyms. 
          Start your free trial today.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <button
            onClick={scrollToRoles}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2.5rem",
              background: "white",
              color: "var(--primary)",
              borderRadius: "var(--radius)",
              fontWeight: 700,
              fontSize: "1rem",
              boxShadow: "var(--shadow-lg)",
              transition: "all 0.2s ease",
            }}
          >
            Get Started Free
            <ArrowRight size={18} />
          </button>
          <span
            style={{
              fontSize: "0.875rem",
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            No credit card required
          </span>
        </div>
      </div>
    </section>
  );
}
