import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/* ── Helpers ─────────────────────────────────────────────────────────── */

function formatRupee(value) {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000)   return `₹${(value / 1000).toFixed(1)}k`;
  return `₹${value}`;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background:   "#0D1521",
        border:       "1px solid rgba(255,255,255,0.10)",
        borderRadius: "12px",
        padding:      "12px 16px",
        boxShadow:    "0 16px 40px rgba(0,0,0,0.35)",
        minWidth:     "160px",
      }}
    >
      <p
        style={{
          fontFamily:    "'Space Mono', monospace",
          fontSize:      "10px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color:         "#64748b",
          marginBottom:  "8px",
        }}
      >
        {label}
      </p>

      {payload.map((entry) => (
        <div
          key={entry.name}
          style={{
            display:       "flex",
            justifyContent:"space-between",
            gap:           "20px",
            marginBottom:  "4px",
          }}
        >
          <span style={{ color: entry.color, fontSize: "12px", fontWeight: 600 }}>
            {entry.name}
          </span>
          <span style={{ color: "#e2e8f0", fontSize: "12px", fontWeight: 700 }}>
            ₹{Number(entry.value).toLocaleString("en-IN")}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Empty state ─────────────────────────────────────────────────────── */

function EmptyChart() {
  return (
    <div
      style={{
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
        justifyContent:"center",
        minHeight:     "240px",
        borderRadius:  "16px",
        border:        "1px dashed rgba(255,255,255,0.08)",
        background:    "rgba(255,255,255,0.01)",
      }}
    >
      <p style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>
        No trend data yet
      </p>
      <p style={{ color: "#475569", fontSize: "13px", lineHeight: "1.6", textAlign: "center", maxWidth: "280px" }}>
        Add transactions to generate monthly income and expense trends.
      </p>
    </div>
  );
}

/* ── CashflowChart ───────────────────────────────────────────────────── */

/**
 * CashflowChart
 *
 * Props:
 *   data — array of { month, income, expense }
 *          from the backend analytics service monthlyTrend
 */
function CashflowChart({ data = [] }) {
  if (!data.length) return <EmptyChart />;

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart
        data={data}
        margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
      >
        <defs>
          {/* Income gradient */}
          <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#34d399" stopOpacity={0.28} />
            <stop offset="95%" stopColor="#34d399" stopOpacity={0.01} />
          </linearGradient>

          {/* Expense gradient */}
          <linearGradient id="gradExpense" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#f87171" stopOpacity={0.28} />
            <stop offset="95%" stopColor="#f87171" stopOpacity={0.01} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255,255,255,0.06)"
          vertical={false}
        />

        <XAxis
          dataKey="month"
          tick={{ fill: "#64748b", fontSize: 11, fontFamily: "'Space Mono', monospace" }}
          tickLine={false}
          axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
          dy={6}
        />

        <YAxis
          tickFormatter={formatRupee}
          tick={{ fill: "#64748b", fontSize: 11, fontFamily: "'Space Mono', monospace" }}
          tickLine={false}
          axisLine={false}
          width={54}
        />

        <Tooltip content={<CustomTooltip />} />

        <Legend
          wrapperStyle={{
            paddingTop:    "12px",
            fontSize:      "12px",
            fontWeight:    600,
            fontFamily:    "system-ui, sans-serif",
            color:         "#94a3b8",
          }}
        />

        <Area
          type="monotone"
          dataKey="income"
          name="Income"
          stroke="#34d399"
          strokeWidth={2.5}
          fill="url(#gradIncome)"
          dot={false}
          activeDot={{ r: 5, fill: "#34d399", strokeWidth: 0 }}
        />

        <Area
          type="monotone"
          dataKey="expense"
          name="Expense"
          stroke="#f87171"
          strokeWidth={2.5}
          fill="url(#gradExpense)"
          dot={false}
          activeDot={{ r: 5, fill: "#f87171", strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default CashflowChart;
