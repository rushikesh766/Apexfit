type ProgressProps = {
  value: number;
  max?: number;
};

export function Progress({ value, max = 100 }: ProgressProps) {
  const width = Math.max(0, Math.min(100, Math.round((value / max) * 100)));
  return (
    <div className="progress-track" aria-label={`${width}%`}>
      <div className="progress-fill" style={{ width: `${width}%` }} />
    </div>
  );
}
