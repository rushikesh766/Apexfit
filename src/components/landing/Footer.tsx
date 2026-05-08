"use client";

import { Dumbbell } from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{
        padding: "3rem 1.5rem 2rem",
        background: "var(--secondary)",
        borderTop: "1px solid var(--border)",
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
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "var(--primary)",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Dumbbell size={18} color="white" />
              </div>
              <span
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 800,
                  color: "var(--foreground)",
                }}
              >
                APEXFIT
              </span>
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--muted)",
                lineHeight: 1.6,
                maxWidth: "280px",
              }}
            >
              The all-in-one gym management platform for modern fitness businesses.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4
              style={{
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "var(--foreground)",
                marginBottom: "1rem",
              }}
            >
              Product
            </h4>
            <ul style={{ listStyle: "none" }}>
              {["Features", "Pricing", "Integrations", "Changelog"].map((item) => (
                <li key={item} style={{ marginBottom: "0.5rem" }}>
                  <a
                    href="#"
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--muted)",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              style={{
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "var(--foreground)",
                marginBottom: "1rem",
              }}
            >
              Company
            </h4>
            <ul style={{ listStyle: "none" }}>
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item} style={{ marginBottom: "0.5rem" }}>
                  <a
                    href="#"
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--muted)",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              style={{
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "var(--foreground)",
                marginBottom: "1rem",
              }}
            >
              Legal
            </h4>
            <ul style={{ listStyle: "none" }}>
              {["Privacy", "Terms", "Security"].map((item) => (
                <li key={item} style={{ marginBottom: "0.5rem" }}>
                  <a
                    href="#"
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--muted)",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--muted)",
            }}
          >
            2024 APEXFIT. All rights reserved.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
            }}
          >
            {["Twitter", "LinkedIn", "Instagram"].map((social) => (
              <a
                key={social}
                href="#"
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--muted)",
                  transition: "color 0.2s ease",
                }}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
