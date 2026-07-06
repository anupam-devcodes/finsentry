import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const PAYMENT_METHODS = {
  cash: "Cash",
  card: "Card",
  upi: "UPI",
  bank_transfer: "Bank Transfer",
  wallet: "Wallet",
  other: "Other",
};

function TransactionTable({
  transactions,
  selectedIds = [],
  onSelectToggle,
  onSelectAllToggle,
  onEdit,
  onDelete,
}) {
  const allSelected =
    transactions.length > 0 && transactions.every((t) => selectedIds.includes(t.id || t._id));

  const someSelected =
    transactions.length > 0 &&
    transactions.some((t) => selectedIds.includes(t.id || t._id)) &&
    !allSelected;

  function formatPaymentMethod(method) {
    if (!method) return "—";
    return PAYMENT_METHODS[method.toLowerCase()] || method;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B111C]">
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-left">
              {/* Checkbox Column */}
              <th className="w-12 px-5 py-4">
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

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Transaction
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Type
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Category
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Payment
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Date
              </th>
              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Amount
              </th>
              <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {transactions.map((transaction) => {
              const id = transaction.id || transaction._id;
              const isSelected = selectedIds.includes(id);
              const isIncome = transaction.type?.toLowerCase() === "income";

              return (
                <tr
                  key={id}
                  className={`border-b border-white/[0.04] transition hover:bg-white/[0.03] ${
                    isSelected ? "bg-white/[0.015]" : "bg-transparent"
                  }`}
                >
                  {/* Checkbox */}
                  <td className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onSelectToggle(id)}
                      className="h-4 w-4 rounded border-white/10 bg-white/[0.04] text-emerald-400 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                    />
                  </td>

                  {/* Title & Description */}
                  <td className="px-5 py-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold leading-normal text-white">
                          {transaction.title || "Untitled Transaction"}
                        </p>
                        {transaction.isRecurring && (
                          <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                            ↻ {transaction.recurringInterval}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 max-w-[280px] truncate text-xs leading-normal text-slate-500">
                        {transaction.description || "No description"}
                      </p>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold leading-normal ${
                        isIncome
                          ? "bg-emerald-400/10 text-emerald-300"
                          : "bg-red-400/10 text-red-300"
                      }`}
                    >
                      {isIncome ? "Income" : "Expense"}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4 text-sm leading-normal text-slate-300">
                    {transaction.category || "Uncategorized"}
                  </td>

                  {/* Payment Method */}
                  <td className="px-5 py-4 text-sm leading-normal text-slate-400">
                    {formatPaymentMethod(transaction.paymentMethod)}
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4 text-sm leading-normal text-slate-400">
                    {formatDate(transaction.date)}
                  </td>

                  {/* Amount */}
                  <td
                    className={`px-5 py-4 text-right text-sm font-semibold leading-normal ${
                      isIncome ? "text-emerald-300" : "text-red-300"
                    }`}
                  >
                    {isIncome ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => onEdit(transaction)}
                        className="grid h-8 w-8 place-items-center rounded-xl border border-white/5 bg-white/[0.03] text-sm text-slate-400 transition hover:bg-white/[0.08] hover:text-white"
                        title="Edit Transaction"
                      >
                        ✎
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(id)}
                        className="grid h-8 w-8 place-items-center rounded-xl border border-red-500/10 bg-red-500/5 text-sm text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
                        title="Delete Transaction"
                      >
                        🗑
                      </button>
                    </div>
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

export default TransactionTable;