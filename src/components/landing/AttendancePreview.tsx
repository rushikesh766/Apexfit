import { CheckCircle, Calendar, Fingerprint, QrCode, Smartphone } from "lucide-react";

// Static attendance data to avoid hydration mismatch
const STATIC_ATTENDANCE_DATA: { day: number; status: "present" | "absent" | "future" }[] = [
  { day: 1, status: "present" },
  { day: 2, status: "present" },
  { day: 3, status: "absent" },
  { day: 4, status: "present" },
  { day: 5, status: "present" },
  { day: 6, status: "present" },
  { day: 7, status: "absent" },
  { day: 8, status: "present" },
  { day: 9, status: "present" },
  { day: 10, status: "present" },
  { day: 11, status: "present" },
  { day: 12, status: "absent" },
  { day: 13, status: "present" },
  { day: 14, status: "present" },
  { day: 15, status: "present" },
  { day: 16, status: "present" },
  { day: 17, status: "present" },
  { day: 18, status: "absent" },
  { day: 19, status: "present" },
  { day: 20, status: "present" },
  { day: 21, status: "future" },
  { day: 22, status: "future" },
  { day: 23, status: "future" },
  { day: 24, status: "future" },
  { day: 25, status: "future" },
  { day: 26, status: "future" },
  { day: 27, status: "future" },
  { day: 28, status: "future" },
  { day: 29, status: "future" },
  { day: 30, status: "future" },
  { day: 31, status: "future" },
];

// Static values to avoid hydration mismatch
const DISPLAY_MONTH = "May 2026";
const TODAY_DATE = 20;
const FIRST_DAY_OFFSET = 5; // May 2026 starts on Friday (index 5)
const PRESENT_COUNT = 16;
const ABSENT_COUNT = 4;
const ATTENDANCE_RATE = "80%";

export function AttendancePreview() {
  const attendanceData = STATIC_ATTENDANCE_DATA;

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
                {DISPLAY_MONTH}
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
            {Array.from({ length: FIRST_DAY_OFFSET }).map((_, i) => (
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
                  fontWeight: day === TODAY_DATE ? 700 : 500,
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
                  border: day === TODAY_DATE ? "2px solid var(--primary)" : "none",
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
              { label: "Present", value: PRESENT_COUNT, color: "var(--success)" },
              { label: "Absent", value: ABSENT_COUNT, color: "#ef4444" },
              { label: "Rate", value: ATTENDANCE_RATE, color: "var(--primary)" },
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
