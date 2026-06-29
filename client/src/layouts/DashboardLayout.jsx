import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  { label: "Command Center", path: "/dashboard", icon: "⌂" },
  { label: "Ledger", path: "/transactions", icon: "▤" },
  { label: "Receipt Intelligence", path: "/scan-receipt", icon: "◈" },
  { label: "Data Import", path: "/import-csv", icon: "⇧" },
  { label: "AI Reports", path: "/reports", icon: "↗" },
  { label: "Account", path: "/profile", icon: "○" },
];

function getFirstName(name = "") {
  return name.trim().split(" ")[0] || "there";
}

function getInitials(name = "") {
  const words = name.trim().split(" ").filter(Boolean);

  if (words.length === 0) return "U";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();

  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}


function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const userName = user?.name || "User";
  const userEmail = user?.email || "No email";
  const initials = getInitials(userName);
  const firstName = getFirstName(userName);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
<div
  className="min-h-screen bg-[#060A12] text-slate-100 antialiased"
  style={{
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  }}
>      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-[292px] flex-col border-r border-white/10 bg-[#070B13]/95 px-5 py-6 lg:flex">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl border border-emerald-400/30 bg-white text-base font-extrabold text-[#050912] shadow-[0_0_30px_rgba(52,211,153,0.18)]">
            FS
          </div>

          <div>
            <p className="font-mono text-sm font-bold uppercase tracking-[0.24em] text-white">
              FinSentry
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Ledger Intelligence
            </p>
          </div>
        </div>

        <nav className="mt-10 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-4 rounded-2xl border px-4 py-3 text-sm font-semibold leading-6 transition ${
                  isActive
                    ? "border-emerald-400/70 bg-emerald-400/10 text-white shadow-[0_0_30px_rgba(52,211,153,0.12)]"
                    : "border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
                }`
              }
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-base text-emerald-300">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.035] p-5">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
            AI Finance Engine
          </p>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Receipt Scan</span>
              <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Monthly Reports</span>
              <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                Active
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="lg:pl-[292px]">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050912]/85 backdrop-blur-xl">
          <div className="flex min-h-[88px] items-center justify-between gap-4 px-5 py-4 lg:px-8">
            <div>
  <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
    FinSentry Workspace
  </p>

  <h1 className="mt-1 text-xl font-semibold leading-normal tracking-[-0.01em] text-white md:text-2xl">
    Welcome back, {firstName} <span className="inline-block">👋</span>
  </h1>

  <p className="mt-1 hidden text-sm leading-6 text-slate-500 md:block">
    Here&apos;s your financial snapshot for today.
  </p>
</div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold leading-5 text-white">
                  {userName}
                </p>
                <p className="text-xs leading-5 text-slate-500">{userEmail}</p>
              </div>

              <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-sm font-extrabold text-white">
                {initials}
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white/[0.08]"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex gap-2 overflow-x-auto border-t border-white/10 px-5 py-3 lg:hidden">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `shrink-0 rounded-xl border px-4 py-2 text-xs font-semibold ${
                    isActive
                      ? "border-emerald-400/70 bg-emerald-400/10 text-white"
                      : "border-white/10 bg-white/[0.03] text-slate-400"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </header>

        <main className="min-h-[calc(100vh-88px)] px-5 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;