"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";

type Role = "student" | "trainer" | "owner";

const roles: { id: Role; label: string; description: string }[] = [
  { id: "student", label: "Student", description: "Track workouts, check-in, view leaderboard" },
  { id: "trainer", label: "Trainer", description: "Manage students, create workout plans" },
  { id: "owner", label: "Owner", description: "Full gym management and analytics" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate login - in production this would validate credentials
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Demo login - any credentials work, route based on selected role
    setLoading(false);
    router.push(`/${role}`);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        background: "linear-gradient(135deg, var(--secondary) 0%, var(--background) 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "var(--card)",
          borderRadius: "var(--radius)",
          boxShadow: "var(--shadow-lg)",
          padding: "2.5rem",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "var(--primary)",
              borderRadius: "var(--radius)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <span style={{ color: "white", fontWeight: 800, fontSize: "1.5rem" }}>A</span>
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.25rem" }}>
            Welcome to APEXFIT
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--muted)" }}>Sign in to continue to your dashboard</p>
        </div>

        {/* Role Selection */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem", color: "var(--foreground)" }}>
            Select your role
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                style={{
                  padding: "0.75rem 0.5rem",
                  borderRadius: "var(--radius-sm)",
                  border: role === r.id ? "2px solid var(--primary)" : "1px solid var(--border)",
                  background: role === r.id ? "var(--accent)" : "var(--background)",
                  color: role === r.id ? "var(--primary)" : "var(--foreground)",
                  fontSize: "0.8125rem",
                  fontWeight: role === r.id ? 600 : 500,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.5rem", textAlign: "center" }}>
            {roles.find((r) => r.id === role)?.description}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="email"
              style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem", color: "var(--foreground)" }}
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                fontSize: "0.9375rem",
                background: "var(--background)",
                color: "var(--foreground)",
                outline: "none",
                transition: "border-color 0.15s ease",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="password"
              style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem", color: "var(--foreground)" }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 3rem 0.75rem 1rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border)",
                  fontSize: "0.9375rem",
                  background: "var(--background)",
                  color: "var(--foreground)",
                  outline: "none",
                  transition: "border-color 0.15s ease",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div
              style={{
                padding: "0.75rem",
                borderRadius: "var(--radius-sm)",
                background: "#fef2f2",
                color: "#991b1b",
                fontSize: "0.875rem",
                marginBottom: "1rem",
              }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.875rem",
              borderRadius: "var(--radius-sm)",
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              fontSize: "0.9375rem",
              fontWeight: 600,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              transition: "opacity 0.15s ease",
            }}
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <LogIn size={18} />
                <span>Sign in</span>
              </>
            )}
          </button>
        </form>

        {/* Demo notice */}
        <div
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem",
            borderRadius: "var(--radius-sm)",
            background: "var(--accent)",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "0.75rem", color: "var(--accent-foreground)", fontWeight: 500 }}>
            Demo Mode: Any credentials will work. Select a role and sign in to explore.
          </p>
        </div>

        {/* Footer links */}
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <a href="/" style={{ fontSize: "0.875rem", color: "var(--primary)", fontWeight: 500 }}>
            Back to home
          </a>
        </div>
      </div>
    </main>
  );
}
