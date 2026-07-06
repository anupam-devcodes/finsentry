import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

/* ── Palette — 6 curated, non-rainbow, professional tones ───────────── */

const PALETTE = [
  "#34d399", // emerald
  "#60a5fa", // blue
  "#f59e0b", // amber
  "#a78bfa", // violet
  "#fb923c", // orange
  "#e879f9", // fuchsia (subtle)
];

/* ── Helpers ─────────────────────────────────────────────────────────── */

function formatRupee(value) {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000)   return `₹${(value / 1000).toFixed(1)}k`;
  return `₹${value}`;
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];

  return (
    <div
      style={{
        background:   "#0D1521",
        border:       "1px solid rgba(255,255,255,0.10)",
        borderRadius: "10px",
        padding:      "10px 14px",
        boxShadow:    "0 12px 32px rgba(0,0,0,0.35)",
        minWidth:     "150px",
      }}
    >
      <p style={{ color: d.payload.fill, fontWeight: 700, fontSize: "13px", marginBottom: "4px" }}>
        {d.name}
      </p>
      <p style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: 600 }}>
        ₹{Number(d.value).toLocaleString("en-IN")}
      </p>
      <p style={{ color: "#64748b", fontSize: "11px", marginTop: "2px" }}>
        {d.payload.percentage}% of expenses
      </p>
    </div>
  );
}

/* ── Center label ────────────────────────────────────────────────────── */

function CenterLabel({ cx, cy, totalExpense }) {
  return (
    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
      <tspan
        x={cx}
        dy="-8"
        style={{
          fontSize:   "11px",
          fill:       "#64748b",
          fontFamily: "'Space Mono', monospace",
          letterSpacing: "0.08em",
        }}
      >
        TOTAL
      </tspan>
      <tspan
        x={cx}
        dy="20"
        style={{
          fontSize:   "17px",
          fontWeight: 700,
          fill:       "#f1f5f9",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {formatRupee(totalExpense)}
      </tspan>
    </text>
  );
}

/* ── Empty state ─────────────────────────────────────────────────────── */

function EmptyChart() {
  return (
    <div
      style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        minHeight:      "240px",
        borderRadius:   "16px",
        border:         "1px dashed rgba(255,255,255,0.08)",
        background:     "rgba(255,255,255,0.01)",
      }}
    >
      <p style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>
        No category data yet
      </p>
      <p
        style={{
          color:     "#475569",
          fontSize:  "13px",
          lineHeight:"1.6",
          textAlign: "center",
          maxWidth:  "240px",
        }}
      >
        Add expenses to see category-wise spending breakdown.
      </p>
    </div>
  );
}

/* ── ExpenseDonutChart ───────────────────────────────────────────────── */

/**
 * ExpenseDonutChart
 *
 * Props:
 *   data         — array of { category, totalAmount, count } from backend
 *   totalExpense — sum used for percentage calculation and center label
 */
function ExpenseDonutChart({ data = [], totalExpense = 0 }) {
  // Normalize: take top 6 categories with non-zero amounts
  const top6 = data
    .filter((d) => (d.totalAmount || 0) > 0)
    .slice(0, 6)
    .map((d, i) => ({
      name:       d.category || "Other",
      value:      d.totalAmount || 0,
      fill:       PALETTE[i % PALETTE.length],
      percentage: totalExpense > 0
        ? Math.round(((d.totalAmount || 0) / totalExpense) * 100)
        : 0,
    }));

  if (!top6.length) return <EmptyChart />;

  const cx = 110;
  const cy = 110;

  return (
    <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", flexWrap: "wrap" }}>
      {/* Donut chart */}
      <div style={{ flexShrink: 0 }}>
        <ResponsiveContainer width={220} height={220}>
          <PieChart>
            <Pie
              data={top6}
              cx={cx}
              cy={cy}
              innerRadius={68}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {top6.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>

            {/* Center total label */}
            <CenterLabel cx={cx} cy={cy} totalExpense={totalExpense} />

            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div style={{ flex: 1, minWidth: "140px", paddingTop: "12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {top6.map((entry) => (
            <div
              key={entry.name}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              {/* Color dot */}
              <span
                style={{
                  width:        "10px",
                  height:       "10px",
                  borderRadius: "50%",
                  background:   entry.fill,
                  flexShrink:   0,
                }}
              />

              {/* Name + amount + % */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display:        "flex",
                    justifyContent: "space-between",
                    alignItems:     "baseline",
                    gap:            "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize:     "13px",
                      fontWeight:   600,
                      color:        "#cbd5e1",
                      whiteSpace:   "nowrap",
                      overflow:     "hidden",
                      textOverflow: "ellipsis",
                      maxWidth:     "120px",
                    }}
                    title={entry.name}
                  >
                    {entry.name}
                  </span>

                  <span
                    style={{
                      fontSize:  "12px",
                      fontWeight:700,
                      color:     "#f1f5f9",
                      flexShrink:0,
                    }}
                  >
                    {formatRupee(entry.value)}
                  </span>
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    marginTop:    "4px",
                    height:       "3px",
                    borderRadius: "4px",
                    background:   "rgba(255,255,255,0.06)",
                    overflow:     "hidden",
                  }}
                >
                  <div
                    style={{
                      height:      "100%",
                      borderRadius:"4px",
                      background:  entry.fill,
                      width:       `${entry.percentage}%`,
                    }}
                  />
                </div>

                <span
                  style={{
                    fontSize: "11px",
                    color:    "#475569",
                    marginTop:"2px",
                    display:  "block",
                  }}
                >
                  {entry.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExpenseDonutChart;
