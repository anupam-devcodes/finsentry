function TransactionFilters({ filters, onChange, onReset }) {
  function updateFilter(name, value) {
    onChange({
      ...filters,
      [name]: value,
      page: 1,
    });
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-[#0B111C] p-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr_0.8fr_auto]">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Search
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(event) => updateFilter("search", event.target.value)}
            placeholder="Search title, description, category..."
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-normal text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400/60"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Type
          </label>
          <select
            value={filters.type}
            onChange={(event) => updateFilter("type", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-normal text-white outline-none transition focus:border-emerald-400/60"
          >
            <option value="">All</option>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Category
          </label>
          <input
            type="text"
            value={filters.category}
            onChange={(event) => updateFilter("category", event.target.value)}
            placeholder="Food"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-normal text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400/60"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(event) => updateFilter("sortBy", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-normal text-white outline-none transition focus:border-emerald-400/60"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="category">Category</option>
            <option value="createdAt">Created At</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Order
          </label>
          <select
            value={filters.sortOrder}
            onChange={(event) => updateFilter("sortOrder", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-normal text-white outline-none transition focus:border-emerald-400/60"
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={onReset}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}

export default TransactionFilters;