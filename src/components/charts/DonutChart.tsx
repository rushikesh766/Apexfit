type Segment = {
  label: string;
  value: number;
  color: string;
};

type DonutChartProps = {
  data: Segment[];
};

export function DonutChart({ data }: DonutChartProps) {
  let cursor = 0;
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  const gradient = data
    .map((segment) => {
      const start = cursor;
      const end = cursor + (segment.value / total) * 100;
      cursor = end;
      return `${segment.color} ${start}% ${end}%`;
    })
    .join(", ");

  return (
    <div className="donut-wrap">
      <div className="donut" style={{ background: `conic-gradient(${gradient})` }} role="img" aria-label="Retention donut chart">
        <div className="donut-center">
          <div>
            <strong>{data[0]?.value ?? 0}%</strong>
            <span className="fine-print">renewed</span>
          </div>
        </div>
      </div>
      <div className="legend">
        {data.map((segment) => (
          <div className="legend-item" key={segment.label}>
            <span className="legend-key">
              <span className="swatch" style={{ background: segment.color }} />
              {segment.label}
            </span>
            <strong>{segment.value}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
