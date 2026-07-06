function ReceiptSummaryCard({ summary }) {
  if (!summary) return null;

  return (
    <div className="rounded-3xl border border-emerald-400/20 bg-[#0B111C] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
          ◈
        </span>
        <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-emerald-300">
          AI Extraction Summary
        </h4>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">
        {summary}
      </p>
    </div>
  );
}

export default ReceiptSummaryCard;
