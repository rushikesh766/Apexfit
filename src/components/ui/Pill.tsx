import type { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
  tone?: "default" | "danger" | "warning" | "cyan";
};

export function Pill({ children, tone = "default" }: PillProps) {
  return <span className={`status-pill ${tone === "default" ? "" : tone}`}>{children}</span>;
}
