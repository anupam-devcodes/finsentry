import { Link } from "react-router-dom";

function ImportResultCard({ importedCount, totalRows, onReset }) {
  return (
    <div className="rounded-3xl border border-emerald-400/20 bg-[#0B111C] p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl border border-emerald-400/30 bg-emerald-400/10 text-2xl text-emerald-300">
        ✓
      </div>

      <h3 className="mt-6 text-xl font-semibold text-white">Import Complete!</h3>
      
      <p className="mt-3 max-w-sm mx-auto text-sm leading-6 text-slate-400">
        We successfully imported <span className="font-extrabold text-emerald-300">{importedCount}</span> transactions out of{" "}
        <span className="font-bold text-white">{totalRows}</span> parsed CSV rows.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onReset}
          className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
        >
          Import Another CSV
        </button>

        <Link
          to="/transactions"
          className="rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#06100B] transition hover:bg-emerald-300"
        >
          View in Ledger →
        </Link>
      </div>
    </div>
  );
}

export default ImportResultCard;
