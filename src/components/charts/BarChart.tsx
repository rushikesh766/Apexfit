import type { CSSProperties } from "react";

type Bar = {
  label: string;
  value: number;
};

type BarChartProps = {
  data: Bar[];
};

export function BarChart({ data }: BarChartProps) {
  const max = Math.max(...data.map((bar) => bar.value), 1);

  return (
    <div className="bar-chart" style={{ "--bars": data.length } as CSSProperties} role="img" aria-label="Bar chart">
      {data.map((bar) => (
        <div className="bar-column" key={bar.label}>
          <div className="bar-fill" title={`${bar.label}: ${bar.value}`} style={{ height: `${Math.max(8, (bar.value / max) * 150)}px` }} />
          <span>{bar.label}</span>
        </div>
      ))}
    </div>
  );
}
