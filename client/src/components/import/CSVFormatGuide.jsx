import { useState } from "react";
import toast from "react-hot-toast";

const SAMPLE_CSV = `type,amount,category,date,paymentMethod,description
expense,1450.00,Grocery,2026-07-01,card,Weekly grocery stock
income,45000.00,Salary,2026-07-01,bank_transfer,Monthly paycheck
expense,350.00,Food,2026-07-03,upi,Lunch at Cafe
expense,2500.00,Bills,2026-07-05,wallet,Electricity bill`;

function CSVFormatGuide() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(SAMPLE_CSV);
    setCopied(true);
    toast.success("CSV template copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B111C] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
      <h3 className="text-lg font-semibold tracking-[-0.01em] text-white">
        CSV Formatting Guide
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Review column names and specifications to ensure clean import
      </p>

      {/* Guide Columns */}
      <div className="mt-5 space-y-4 text-xs">
        <div className="grid gap-3 rounded-2xl border border-white/5 bg-white/[0.01] p-4">
          <h4 className="font-semibold text-emerald-300">Required Columns:</h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <span className="font-mono text-white font-semibold">type</span>: Must be either{" "}
              <code className="text-emerald-300">income</code> or <code className="text-emerald-300">expense</code>.
            </li>
            <li>
              <span className="font-mono text-white font-semibold">amount</span>: A positive number (e.g. 1500.50).
            </li>
            <li>
              <span className="font-mono text-white font-semibold">category</span>: Transaction category (e.g. Food, Salary). Max 50 chars.
            </li>
            <li>
              <span className="font-mono text-white font-semibold">date</span>: Transaction date in ISO format (YYYY-MM-DD).
            </li>
          </ul>
        </div>

        <div className="grid gap-3 rounded-2xl border border-white/5 bg-white/[0.01] p-4">
          <h4 className="font-semibold text-slate-300">Optional Columns:</h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <span className="font-mono text-white font-semibold">paymentMethod</span>: Must be{" "}
              <code className="text-slate-300">cash</code>, <code className="text-slate-300">card</code>,{" "}
              <code className="text-slate-300">upi</code>, <code className="text-slate-300">bank_transfer</code>,{" "}
              <code className="text-slate-300">wallet</code>, or <code className="text-slate-300">other</code>.
            </li>
            <li>
              <span className="font-mono text-white font-semibold">description</span>: Brief notes about the transaction. Max 200 chars.
            </li>
          </ul>
        </div>

        {/* Code Block template */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
              Sample Template
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="text-[11px] font-bold text-emerald-300 hover:text-emerald-200 transition"
            >
              {copied ? "Copied! ✓" : "Copy Template"}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-2xl border border-white/5 bg-[#060A12] p-4 font-mono text-[11px] leading-relaxed text-slate-400">
            {SAMPLE_CSV}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default CSVFormatGuide;
