import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

function TransactionTable({ transactions }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B111C]">
      <div className="overflow-x-auto">
        <table className="min-w-[920px] w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-left">
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
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {transactions.map((transaction) => {
              const isIncome = transaction.type === "INCOME";

              return (
                <tr
                  key={transaction.id || transaction._id}
                  className="bg-white/[0.015] transition hover:bg-white/[0.04]"
                >
                  <td className="px-5 py-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold leading-normal text-white">
                        {transaction.title || "Untitled Transaction"}
                      </p>

                      <p className="mt-1 max-w-[320px] truncate text-xs leading-normal text-slate-500">
                        {transaction.description || "No description"}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold leading-normal ${
                        isIncome
                          ? "bg-emerald-400/10 text-emerald-300"
                          : "bg-red-400/10 text-red-300"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm leading-normal text-slate-300">
                    {transaction.category || "Uncategorized"}
                  </td>

                  <td className="px-5 py-4 text-sm leading-normal text-slate-400">
                    {transaction.paymentMethod || "—"}
                  </td>

                  <td className="px-5 py-4 text-sm leading-normal text-slate-400">
                    {formatDate(transaction.date)}
                  </td>

                  <td
                    className={`px-5 py-4 text-right text-sm font-semibold leading-normal ${
                      isIncome ? "text-emerald-300" : "text-red-300"
                    }`}
                  >
                    {isIncome ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
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