function TransactionFilters({ filters, onChange, onReset }) {
  function updateFilter(name, value) {
    onChange({
      ...filters,
      [name]: value,
      page: 1, // Reset page when filters change
    });
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-[#0B111C] p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_1fr_1fr_0.8fr_0.8fr_auto]">
        {/* Search */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Search
          </label>
          <input
            type="text"
            value={filters.search || ""}
            onChange={(event) => updateFilter("search", event.target.value)}
            placeholder="Search title, category..."
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400/60"
          />
        </div>

        {/* Type */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Type
          </label>
          <select
            value={filters.type || ""}
            onChange={(event) => updateFilter("type", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0B111C] px-3 py-2.5 text-xs text-white outline-none transition focus:border-emerald-400/60"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Category
          </label>
          <input
            type="text"
            value={filters.category || ""}
            onChange={(event) => updateFilter("category", event.target.value)}
            placeholder="Food, Rent etc."
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400/60"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Payment Method
          </label>
          <select
            value={filters.paymentMethod || ""}
            onChange={(event) => updateFilter("paymentMethod", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0B111C] px-3 py-2.5 text-xs text-white outline-none transition focus:border-emerald-400/60"
          >
            <option value="">All Methods</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="upi">UPI</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="wallet">Wallet</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Start Date
          </label>
          <input
            type="date"
            value={filters.startDate || ""}
            onChange={(event) => updateFilter("startDate", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0B111C] px-3 py-2.5 text-xs text-white outline-none transition focus:border-emerald-400/60"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            End Date
          </label>
          <input
            type="date"
            value={filters.endDate || ""}
            onChange={(event) => updateFilter("endDate", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0B111C] px-3 py-2.5 text-xs text-white outline-none transition focus:border-emerald-400/60"
          />
        </div>

        {/* Sort By */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Sort By
          </label>
          <select
            value={filters.sortBy || "date"}
            onChange={(event) => updateFilter("sortBy", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0B111C] px-3 py-2.5 text-xs text-white outline-none transition focus:border-emerald-400/60"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="category">Category</option>
            <option value="createdAt">Created At</option>
          </select>
        </div>

        {/* Order */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Order
          </label>
          <select
            value={filters.sortOrder || "desc"}
            onChange={(event) => updateFilter("sortOrder", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0B111C] px-3 py-2.5 text-xs text-white outline-none transition focus:border-emerald-400/60"
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>

        {/* Reset */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={onReset}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/[0.08]"
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}

export default TransactionFilters;