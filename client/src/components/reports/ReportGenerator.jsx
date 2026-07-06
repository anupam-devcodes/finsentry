import { useState } from "react";

const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

function getPreviousMonthAndYear() {
  const date = new Date();
  let month = date.getMonth(); // 0-indexed (0 is Jan)
  let year = date.getFullYear();

  if (month === 0) {
    month = 12;
    year -= 1;
  }

  return { month, year };
}

function ReportGenerator({ onGenerate, isLoading }) {
  const defaults = getPreviousMonthAndYear();
  const [month, setMonth] = useState(defaults.month);
  const [year, setYear] = useState(defaults.year);

  const currentYear = new Date().getFullYear();
  // Generate list of years from 2020 to currentYear + 1
  const years = [];
  for (let y = currentYear + 1; y >= 2020; y--) {
    years.push(y);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onGenerate(Number(month), Number(year));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-[#0B111C] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
    >
      <h3 className="text-lg font-semibold tracking-[-0.01em] text-white">
        Generate Report
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Analyze ledger records using Gemini AI
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {/* Month */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Month
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            disabled={isLoading}
            className="w-full rounded-2xl border border-white/10 bg-[#0B111C] px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/60"
          >
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Year
          </label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            disabled={isLoading}
            className="w-full rounded-2xl border border-white/10 bg-[#0B111C] px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/60"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 w-full rounded-2xl bg-emerald-400 py-3.5 text-sm font-semibold text-[#06100B] transition hover:bg-emerald-300 disabled:opacity-40"
      >
        {isLoading ? "Analyzing Ledger..." : "Generate AI Summary ⚡"}
      </button>
    </form>
  );
}

export default ReportGenerator;
export { MONTHS };
