"use client";

import { CheckCircle, Clock, Calendar, Fingerprint, QrCode, Smartphone } from "lucide-react";

export function AttendancePreview() {
  // Generate mock attendance data for calendar
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const attendanceData = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    if (day > today.getDate()) return { day, status: "future" };
    const random = Math.random();
    if (random > 0.25) return { day, status: "present" };
    return { day, status: "absent" };
  });

  const checkInMethods = [
    { icon: <QrCode size={24} />, label: "QR Code", desc: "Scan to check-in" },
    { icon: <Fingerprint size={24} />, label: "PIN Entry", desc: "Daily unique PIN" },
    { icon: <Smartphone size={24} />, label: "Mobile App", desc: "One-tap check-in" },
  ];

  return (
    <section
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
            <CheckCircle size={16} />
            Attendance System
          </span>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800,
              marginBottom: "1rem",
              color: "var(--foreground)",
            }}
          >
            Effortless Check-ins
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
            Multiple check-in options to suit every gym. Track attendance in real-time 
            with our smart attendance system.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {/* Check-in Methods */}
          {checkInMethods.map((method) => (
            <div
              key={method.label}
              style={{
                background: "var(--card)",
                borderRadius: "var(--radius)",
                padding: "1.5rem",
                boxShadow: "var(--shadow)",
                border: "1px solid var(--border)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  background: "var(--accent)",
                  borderRadius: "var(--radius)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                  color: "var(--primary)",
                }}
              >
                {method.icon}
              </div>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                  color: "var(--foreground)",
                }}
              >
                {method.label}
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--muted)",
                }}
              >
                {method.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Attendance Calendar Preview */}
        <div
          style={{
            background: "var(--card)",
            borderRadius: "var(--radius)",
            padding: "1.5rem",
            boxShadow: "var(--shadow-lg)",
            border: "1px solid var(--border)",
            maxWidth: "500px",
            margin: "0 auto",
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Calendar size={20} color="var(--primary)" />
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--foreground)",
                }}
              >
                {today.toLocaleString("default", { month: "long", year: "numeric" })}
              </h3>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                fontSize: "0.75rem",
                color: "var(--muted)",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    background: "var(--success)",
                    borderRadius: "50%",
                  }}
                />
                Present
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    background: "#fecaca",
                    borderRadius: "50%",
                  }}
                />
                Absent
              </span>
            </div>
          </div>

          {/* Day headers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--muted)",
                  padding: "0.5rem 0",
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "0.5rem",
            }}
          >
            {/* Empty cells for days before the 1st */}
            {Array.from({
              length: new Date(today.getFullYear(), today.getMonth(), 1).getDay(),
            }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Day cells */}
            {attendanceData.map(({ day, status }) => (
              <div
                key={day}
                style={{
                  aspectRatio: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.8125rem",
                  fontWeight: day === today.getDate() ? 700 : 500,
                  background:
                    status === "present"
                      ? "var(--success)"
                      : status === "absent"
                        ? "#fecaca"
                        : "var(--secondary)",
                  color:
                    status === "present"
                      ? "white"
                      : status === "absent"
                        ? "#991b1b"
                        : "var(--muted)",
                  border: day === today.getDate() ? "2px solid var(--primary)" : "none",
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
              marginTop: "1.5rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            {[
              { label: "Present", value: attendanceData.filter((d) => d.status === "present").length, color: "var(--success)" },
              { label: "Absent", value: attendanceData.filter((d) => d.status === "absent").length, color: "#ef4444" },
              { label: "Rate", value: `${Math.round((attendanceData.filter((d) => d.status === "present").length / today.getDate()) * 100)}%`, color: "var(--primary)" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: stat.color,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
