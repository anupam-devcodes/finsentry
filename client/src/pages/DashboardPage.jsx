function DashboardPage() {
  return (
    <div>
      <p className="text-sm font-medium text-violet-300">Dashboard</p>
      <h1 className="mt-2 text-3xl font-bold text-white">
        Good evening, Anupam 👋
      </h1>
      <p className="mt-2 text-slate-400">
        Here is your financial intelligence summary.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {["Total Income", "Total Expense", "Balance", "Savings Rate"].map(
          (item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
            >
              <p className="text-sm text-slate-400">{item}</p>
              <h2 className="mt-3 text-2xl font-bold text-white">Coming soon</h2>
            </div>
          )
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-lg font-bold text-white">Analytics Area</h2>
        <p className="mt-2 text-slate-400">
          Charts will connect to /api/analytics/dashboard later.
        </p>
      </div>
    </div>
  );
}

export default DashboardPage;