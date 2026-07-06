const CATEGORIES = [
  "Food",
  "Grocery",
  "Clothing",
  "Travel",
  "Shopping",
  "Bills",
  "Rent",
  "Entertainment",
  "Healthcare",
  "Education",
  "Other",
];

const PAYMENT_METHODS = [
  { value: "cash", label: "Cash" },
  { value: "card", label: "Card" },
  { value: "upi", label: "UPI" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "wallet", label: "Wallet" },
  { value: "other", label: "Other" },
];

function ExtractedTransactionTable({
  drafts,
  selectedIndices,
  onSelectionToggle,
  onSelectAllToggle,
  onDraftChange,
}) {
  const allSelected = drafts.length > 0 && selectedIndices.length === drafts.length;
  const someSelected = drafts.length > 0 && selectedIndices.length > 0 && !allSelected;

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0B111C]">
      <div className="border-b border-white/10 bg-white/[0.02] p-5">
        <h3 className="text-base font-semibold text-white">Extracted Drafts</h3>
        <p className="mt-1 text-xs text-slate-500">
          AI separated receipt items. Double-check and correct values before saving.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[850px] w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.015] text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="w-12 px-5 py-4 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(input) => {
                    if (input) {
                      input.indeterminate = someSelected;
                    }
                  }}
                  onChange={onSelectAllToggle}
                  className="h-4 w-4 rounded border-white/10 bg-white/[0.04] text-emerald-400 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
              </th>
              <th className="px-5 py-4 w-1/4">Title / Merchant</th>
              <th className="px-5 py-4 w-1/6">Category</th>
              <th className="px-5 py-4 w-1/6">Payment Method</th>
              <th className="px-5 py-4 w-1/6">Date</th>
              <th className="px-5 py-4 text-right w-1/6">Amount (₹)</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5 bg-white/[0.005]">
            {drafts.map((draft, index) => {
              const isSelected = selectedIndices.includes(index);

              return (
                <tr
                  key={index}
                  className={`transition hover:bg-white/[0.02] ${
                    isSelected ? "bg-white/[0.005]" : "opacity-50"
                  }`}
                >
                  {/* Selection Checkbox */}
                  <td className="px-5 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onSelectionToggle(index)}
                      className="h-4 w-4 rounded border-white/10 bg-white/[0.04] text-emerald-400 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                    />
                  </td>

                  {/* Title / Description */}
                  <td className="px-5 py-4">
                    <input
                      type="text"
                      value={draft.title || ""}
                      onChange={(e) => onDraftChange(index, "title", e.target.value)}
                      placeholder="Transaction title"
                      className="w-full rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none focus:border-emerald-400/40"
                    />
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">
                    <select
                      value={draft.category || "Other"}
                      onChange={(e) => onDraftChange(index, "category", e.target.value)}
                      className="w-full rounded-xl border border-white/5 bg-[#0B111C] px-3 py-2 text-sm text-white outline-none focus:border-emerald-400/40"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Payment Method */}
                  <td className="px-5 py-4">
                    <select
                      value={draft.paymentMethod || "other"}
                      onChange={(e) => onDraftChange(index, "paymentMethod", e.target.value)}
                      className="w-full rounded-xl border border-white/5 bg-[#0B111C] px-3 py-2 text-sm text-white outline-none focus:border-emerald-400/40"
                    >
                      {PAYMENT_METHODS.map((pm) => (
                        <option key={pm.value} value={pm.value}>
                          {pm.label}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4">
                    <input
                      type="date"
                      value={draft.date || ""}
                      onChange={(e) => onDraftChange(index, "date", e.target.value)}
                      className="w-full rounded-xl border border-white/5 bg-[#0B111C] px-3 py-2 text-sm text-white outline-none focus:border-emerald-400/40"
                    />
                  </td>

                  {/* Amount */}
                  <td className="px-5 py-4 text-right">
                    <input
                      type="number"
                      step="0.01"
                      value={draft.amount === "" ? "" : draft.amount}
                      onChange={(e) => {
                        const val = e.target.value === "" ? "" : parseFloat(e.target.value);
                        onDraftChange(index, "amount", val);
                      }}
                      placeholder="0.00"
                      className="w-28 text-right rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none focus:border-emerald-400/40"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExtractedTransactionTable;
