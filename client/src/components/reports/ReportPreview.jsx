import { formatCurrency } from "../../utils/formatCurrency";

const MONTHS = {
  1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
  7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December"
};

function ReportPreview({ report }) {
  if (!report) return null;

  const {
    month,
    year,
    totalIncome = 0,
    totalExpense = 0,
    balance = 0,
    transactionCount = 0,
    topExpenseCategories = [],
    aiSummary = "",
    aiInsights = [],
  } = report;

  const monthName = MONTHS[month] || `Month ${month}`;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="rounded-3xl border border-white/10 bg-[#0B111C] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
        <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-500">
          Statement Period: {monthName} {year}
        </h4>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Total Income</p>
            <p className="mt-2 text-lg font-bold text-emerald-300">
              {formatCurrency(totalIncome)}
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Total Expenses</p>
            <p className="mt-2 text-lg font-bold text-red-300">
              {formatCurrency(totalExpense)}
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Net Balance</p>
            <p className={`mt-2 text-lg font-bold ${balance >= 0 ? "text-white" : "text-red-300"}`}>
              {formatCurrency(balance)}
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Transactions</p>
            <p className="mt-2 text-lg font-bold text-slate-300">
              {transactionCount}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left Column: AI Text */}
        <div className="space-y-6">
          {/* AI Summary */}
          <div className="rounded-3xl border border-white/10 bg-[#0B111C] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
            <h3 className="text-base font-semibold text-white">AI-Generated Spending Summary</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {aiSummary || "No spending summary was generated for this month."}
            </p>
          </div>

          {/* AI Insights */}
          {aiInsights.length > 0 && (
            <div className="rounded-3xl border border-white/10 bg-[#0B111C] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
              <h3 className="text-base font-semibold text-white">Actionable Financial Insights</h3>
              <ul className="mt-4 space-y-3.5">
                {aiInsights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-slate-300 leading-6">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-emerald-400/10 text-xs font-bold text-emerald-300 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Category Breakdown */}
        <div className="rounded-3xl border border-white/10 bg-[#0B111C] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
          <h3 className="text-base font-semibold text-white">Top Expenses</h3>
          <p className="mt-1 text-xs text-slate-500">Major categories for this period</p>

          <div className="mt-6 space-y-5">
            {topExpenseCategories.length > 0 ? (
              topExpenseCategories.map((cat, index) => {
                const percentage = totalExpense > 0 ? (cat.amount / totalExpense) * 100 : 0;

                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{cat.category}</span>
                      <span className="text-slate-400">{formatCurrency(cat.amount)}</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-blue-400"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>

                    <div className="text-right text-[10px] text-slate-600">
                      {percentage.toFixed(1)}% of total expenses
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-slate-500 text-center py-6">
                No expense category data available.
              </p>
            )}
          </div>

          {/* Disclaimer */}
          <div className="mt-12 rounded-2xl border border-white/5 bg-white/[0.01] p-4 text-[10px] leading-relaxed text-slate-600">
            Disclaimer: This is an AI-generated spending summary based on your ledger data. It does not constitute formal investment, tax, or financial advice.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportPreview;
