import { Fragment, type CSSProperties } from "react";

type HeatmapProps = {
  data: number[][];
  rows?: string[];
  columns?: string[];
};

export function Heatmap({
  data,
  rows = ["6a", "9a", "12p", "5p", "8p"],
  columns = ["M", "T", "W", "T", "F", "S", "S"]
}: HeatmapProps) {
  const max = Math.max(...data.flat(), 1);

  return (
    <div className="heatmap" role="img" aria-label="Peak hours heatmap">
      <span />
      {columns.map((column, index) => (
        <span className="heat-label" key={`${column}-${index}`}>
          {column}
        </span>
      ))}
      {data.map((row, rowIndex) => (
        <Fragment key={rows[rowIndex]}>
          <span className="heat-label" key={`row-${rows[rowIndex]}`}>
            {rows[rowIndex]}
          </span>
          {row.map((value, cellIndex) => (
            <span
              className="heat-cell"
              key={`${rows[rowIndex]}-${cellIndex}`}
              title={`${rows[rowIndex]} ${columns[cellIndex]}: ${value} visits`}
              style={{ "--heat": Math.max(0.08, value / max).toFixed(2) } as CSSProperties}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
}
