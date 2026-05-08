"use client";

import { Dumbbell, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "0.75rem 1.5rem",
        background: isScrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        borderBottom: isScrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "var(--primary)",
              borderRadius: "var(--radius-sm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Dumbbell size={22} color="white" />
          </div>
          <span
            style={{
              fontSize: "1.25rem",
              fontWeight: 800,
              color: "var(--foreground)",
              letterSpacing: "-0.02em",
            }}
          >
            APEXFIT
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav
          style={{
            display: "none",
            alignItems: "center",
            gap: "2rem",
          }}
          className="desktop-nav"
        >
          {[
            { label: "Features", id: "features" },
            { label: "Roles", id: "roles" },
            { label: "Leaderboard", id: "leaderboard" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              style={{
                background: "none",
                color: "var(--muted)",
                fontSize: "0.9375rem",
                fontWeight: 500,
                transition: "color 0.2s ease",
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div
          style={{
            display: "none",
            alignItems: "center",
            gap: "1rem",
          }}
          className="desktop-cta"
        >
          <a
            href="/login"
            style={{
              background: "none",
              color: "var(--foreground)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Log In
          </a>
          <a
            href="/login"
            style={{
              padding: "0.625rem 1.25rem",
              background: "var(--primary)",
              color: "white",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.9375rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            background: "var(--secondary)",
            borderRadius: "var(--radius-sm)",
            color: "var(--foreground)",
          }}
          className="mobile-menu-btn"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "white",
            borderBottom: "1px solid var(--border)",
            padding: "1rem 1.5rem",
            boxShadow: "var(--shadow-md)",
          }}
          className="mobile-menu"
        >
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {[
              { label: "Features", id: "features" },
              { label: "Roles", id: "roles" },
              { label: "Leaderboard", id: "leaderboard" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  background: "none",
                  color: "var(--foreground)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  padding: "0.75rem 0",
                  textAlign: "left",
                }}
              >
                {item.label}
              </button>
            ))}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "1rem",
                paddingTop: "1rem",
                borderTop: "1px solid var(--border)",
              }}
            >
              <a
                href="/login"
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  background: "var(--secondary)",
                  color: "var(--foreground)",
                  borderRadius: "var(--radius-sm)",
                  fontWeight: 600,
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                Log In
              </a>
              <a
                href="/login"
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  background: "var(--primary)",
                  color: "white",
                  borderRadius: "var(--radius-sm)",
                  fontWeight: 600,
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                Get Started
              </a>
            </div>
          </nav>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav, .desktop-cta {
            display: flex !important;
          }
          .mobile-menu-btn, .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
