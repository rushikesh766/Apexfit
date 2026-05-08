type Point = {
  label: string;
  value: number;
};

type LineChartProps = {
  data: Point[];
  color?: string;
};

export function LineChart({ data, color = "var(--neon)" }: LineChartProps) {
  const width = 640;
  const height = 190;
  const max = Math.max(...data.map((point) => point.value), 1);
  const min = Math.min(...data.map((point) => point.value), 0);
  const spread = Math.max(max - min, 1);
  const points = data.map((point, index) => {
    const x = (index / Math.max(data.length - 1, 1)) * width;
    const y = height - ((point.value - min) / spread) * (height - 30) - 15;
    return { ...point, x, y };
  });
  const path = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <svg className="svg-chart" viewBox={`0 0 ${width} ${height + 28}`} role="img" aria-label="Line chart">
      <defs>
        <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(217,255,63,0.24)" />
          <stop offset="100%" stopColor="rgba(217,255,63,0)" />
        </linearGradient>
      </defs>
      <polyline className="svg-path" points={path} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points={`0,${height} ${path} ${width},${height}`} fill="url(#lineFill)" opacity="0.9" />
      {points.map((point) => (
        <g key={point.label}>
          <circle cx={point.x} cy={point.y} r="5" fill="#0d0d0f" stroke={color} strokeWidth="3" />
          <text x={point.x} y={height + 22} textAnchor="middle" fill="rgba(245,246,239,0.58)" fontSize="18">
            {point.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
