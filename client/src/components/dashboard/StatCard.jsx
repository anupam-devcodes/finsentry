const toneClasses = {
  income: {
    border: "border-emerald-400/20",
    bg: "from-emerald-400/15 via-emerald-400/5 to-transparent",
    text: "text-emerald-300",
    iconBg: "bg-emerald-400/10 border-emerald-400/20",
  },
  expense: {
    border: "border-red-400/20",
    bg: "from-red-400/15 via-red-400/5 to-transparent",
    text: "text-red-300",
    iconBg: "bg-red-400/10 border-red-400/20",
  },
  balance: {
    border: "border-blue-400/20",
    bg: "from-blue-400/15 via-blue-400/5 to-transparent",
    text: "text-blue-300",
    iconBg: "bg-blue-400/10 border-blue-400/20",
  },
  savings: {
    border: "border-amber-400/20",
    bg: "from-amber-400/15 via-amber-400/5 to-transparent",
    text: "text-amber-300",
    iconBg: "bg-amber-400/10 border-amber-400/20",
  },
};

function StatCard({ title, value, helper, tone = "income", icon = "↗" }) {
  const currentTone = toneClasses[tone] || toneClasses.income;

  return (
    <article
className={`relative overflow-hidden rounded-2xl border ${currentTone.border} bg-[#0B111C] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)]`}    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${currentTone.bg}`}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={`text-sm font-semibold ${currentTone.text}`}>
              {title}
            </p>

            <h3 className="mt-4 text-2xl font-semibold leading-normal tracking-[-0.01em] text-white md:text-3xl">
  {value}
</h3>
          </div>

          <div
            className={`grid h-12 w-12 place-items-center rounded-2xl border ${currentTone.iconBg} ${currentTone.text}`}
          >
            {icon}
          </div>
        </div>

        {helper && <p className="mt-4 text-sm leading-6 text-slate-400">{helper}</p>}

        {/* <div className="mt-6 h-10 overflow-hidden rounded-xl bg-black/15">
          <div
            className={`h-full w-full rounded-xl opacity-80 ${
              tone === "expense"
                ? "bg-gradient-to-r from-red-500/10 via-red-400/50 to-red-300/10"
                : tone === "balance"
                ? "bg-gradient-to-r from-blue-500/10 via-blue-400/50 to-blue-300/10"
                : tone === "savings"
                ? "bg-gradient-to-r from-amber-500/10 via-amber-400/50 to-amber-300/10"
                : "bg-gradient-to-r from-emerald-500/10 via-emerald-400/50 to-emerald-300/10"
            }`}
          />
        </div> */}
      </div>
    </article>
  );
}

export default StatCard;