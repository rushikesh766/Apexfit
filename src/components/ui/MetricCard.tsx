import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

type MetricCardProps = {
  label: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  direction?: "up" | "down";
};

export function MetricCard({ label, value, trend, icon: Icon, direction = "up" }: MetricCardProps) {
  const TrendIcon = direction === "up" ? TrendingUp : TrendingDown;

  return (
    <article className="metric-card">
      <div className="row-main">
        <h3>{label}</h3>
        <Icon size={19} color="var(--neon)" aria-hidden="true" />
      </div>
      <div>
        <div className="metric-value">{value}</div>
        <span className="metric-trend">
          <TrendIcon size={15} aria-hidden="true" />
          {trend}
        </span>
      </div>
    </article>
  );
}
