"use client";

import { Building2, LockKeyhole, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { monetizationPlans } from "@/lib/demo-data";

type RoleLandingProps = {
  onLogin: () => void;
};

export function RoleLanding({ onLogin }: RoleLandingProps) {
  return (
    <main className="landing">
      <div className="landing-shell">
        <section className="landing-hero">
          <div className="hero-copy">
            <div className="brand-row">
              <div className="brand">
                <span className="brand-mark">A</span>
                <div>
                  <p className="brand-name">APEXFIT</p>
                  <p className="brand-kicker">Gym Management OS</p>
                </div>
              </div>
              <span className="badge">
                <ShieldCheck size={14} aria-hidden="true" />
                Business Admin
              </span>
            </div>
            <h1>Run the entire gym from one premium mobile cockpit.</h1>
            <p>
              APEXFIT now starts with one secure owner login. Trainers, students, receptionists, managers, and
              accountants are created inside the business workspace with restricted module access.
            </p>
            <div className="hero-proof">
              <div className="proof-tile">
                <strong>Owner</strong>
                <span>single public login</span>
              </div>
              <div className="proof-tile">
                <strong>3</strong>
                <span>business modes</span>
              </div>
              <div className="proof-tile">
                <strong>₹</strong>
                <span>live revenue logic</span>
              </div>
              <div className="proof-tile">
                <strong>PIN</strong>
                <span>real check-in flow</span>
              </div>
            </div>
            <div className="card-grid">
              {[
                { title: "Solo Trainer", body: "Clients, sessions, dues, leads, income, and progress tracking.", icon: Sparkles },
                { title: "Multi Trainer Gym", body: "Members, trainers, fees, check-ins, plans, leads, analytics, and staff.", icon: UsersRound },
                { title: "Multi Branch Chain", body: "Branch selector, branch-scoped stats, and compare branches view.", icon: Building2 }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <article className="role-card" key={item.title}>
                    <div className="role-card-top">
                      <span className="role-icon">
                        <Icon size={22} aria-hidden="true" />
                      </span>
                      <span className="badge">After login</span>
                    </div>
                    <div>
                      <h2>{item.title}</h2>
                      <p>{item.body}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="login-panel" aria-label="Owner login">
            <div>
              <h2>Owner / Business Admin Login</h2>
              <p>Use the demo owner account. Business type selection happens after login and is saved locally.</p>
            </div>
            <div className="field-grid">
              <label>
                Email
                <input value="owner@apexfit.demo" readOnly aria-label="Owner demo email" />
              </label>
              <label>
                Password
                <input value="apexfit-demo" readOnly aria-label="Owner demo password" type="password" />
              </label>
            </div>
            <button className="primary-button" type="button" onClick={onLogin}>
              <LockKeyhole size={16} aria-hidden="true" />
              Enter Owner Workspace
            </button>
            <div className="card-grid">
              {monetizationPlans.map((plan) => (
                <article className="plan-card" key={plan.name}>
                  <div className="row-main">
                    <strong>{plan.name}</strong>
                    <span className="badge">{plan.price}</span>
                  </div>
                  <span className="fine-print">{plan.bestFor}</span>
                  <span className="fine-print">{plan.features}</span>
                </article>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
