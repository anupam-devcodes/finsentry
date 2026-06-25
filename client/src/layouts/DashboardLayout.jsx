import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  { label: "Command Center", path: "/dashboard" },
  { label: "Ledger", path: "/transactions" },
  { label: "Receipt Intelligence", path: "/scan-receipt" },
  { label: "Data Import", path: "/import-csv" },
  { label: "AI Reports", path: "/reports" },
  { label: "Account", path: "/profile" },
];

function getInitials(name = "") {
  const words = name.trim().split(" ");

  if (!words[0]) return "U";

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

function getAvatarUrl(user) {
  return (
    user?.avatarUrl ||
    user?.profilePicture ||
    user?.profileImage ||
    user?.image ||
    user?.avatar?.url ||
    null
  );
}

function DashboardLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const userName = user?.name || "User";
  const userEmail = user?.email || "No email";
  const avatarUrl = getAvatarUrl(user);
  const initials = getInitials(userName);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-[#070A0F] text-white">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-[#1B202B] bg-[#070A0F] p-5 lg:block">
        <div className="mb-10 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-none bg-[#F5F2EB] font-mono text-sm font-black text-[#0A0A0A]">
            FS
          </div>

          <div>
            <p className="font-mono text-sm font-bold uppercase tracking-[0.18em]">
              FinSentry
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
              Ledger Intelligence
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block border px-4 py-3 font-mono text-xs font-bold uppercase tracking-wide transition ${
                  isActive
                    ? "border-[#5AE89A] bg-[#5AE89A]/10 text-[#5AE89A]"
                    : "border-transparent text-slate-500 hover:border-[#2A3140] hover:bg-[#0D111A] hover:text-slate-200"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-5 left-5 right-5 border border-[#2A3140] bg-[#0D111A] p-4">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-slate-300">
            AI Finance Engine
          </p>

          <div className="mt-4 space-y-3 font-mono text-[11px] text-slate-500">
            <div className="flex justify-between">
              <span>Receipt Scan</span>
              <span className="text-[#5AE89A]">Active</span>
            </div>

            <div className="flex justify-between">
              <span>Monthly Reports</span>
              <span className="text-[#5AE89A]">Active</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-[#1B202B] bg-[#070A0F]/90 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#5AE89A]">
                Private Workspace
              </p>
              <h2 className="mt-1 text-lg font-black tracking-[-0.03em] text-white">
                Financial Command Center
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden text-right sm:block">
                <p className="font-mono text-xs font-bold text-slate-200">
                  {userName}
                </p>
                <p className="mt-1 font-mono text-[10px] text-slate-500">
                  {userEmail}
                </p>
              </div>

              <div className="grid h-11 w-11 place-items-center overflow-hidden border border-[#2A3140] bg-[#0D111A] font-mono text-xs font-bold text-[#F5F2EB]">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={userName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>

              <button
                onClick={handleLogout}
                className="border border-[#2A3140] bg-[#0D111A] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-slate-300 hover:border-[#FF8A80] hover:text-[#FF8A80]"
              >
                Logout
              </button>
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