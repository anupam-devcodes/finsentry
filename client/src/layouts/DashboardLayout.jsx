import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Transactions", path: "/transactions" },
  { label: "Scan Receipt", path: "/scan-receipt" },
  { label: "Import CSV", path: "/import-csv" },
  { label: "Reports", path: "/reports" },
  { label: "Profile", path: "/profile" },
];

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-slate-800 bg-slate-950/95 p-5 lg:block">
        <div className="mb-10 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-emerald-500 font-black">
            F
          </div>
          <span className="text-xl font-bold">FinSentry</span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-violet-600/20 text-violet-200 ring-1 ring-violet-500/30"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-4">
          <p className="text-sm font-bold text-violet-200">AI Finance Engine</p>
          <div className="mt-3 space-y-2 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Receipt Scan</span>
              <span className="text-emerald-300">Active</span>
            </div>
            <div className="flex justify-between">
              <span>Monthly Reports</span>
              <span className="text-emerald-300">Active</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">FinSentry Command Center</p>
              <h2 className="text-lg font-bold text-white">
                AI-powered financial workspace
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-300">
                This Month
              </button>

              <div className="grid h-10 w-10 place-items-center rounded-full bg-violet-600 text-sm font-bold">
                AK
              </div>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-73px)] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;