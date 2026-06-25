import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

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

function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const userName = user?.name || "User";
  const userEmail = user?.email || "No email available";
  const avatarUrl = getAvatarUrl(user);
  const initials = getInitials(userName);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div>
      <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#5AE89A]">
        Account
      </p>

      <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-white">
        Profile
      </h1>

      <p className="mt-2 max-w-xl font-mono text-sm leading-7 text-slate-400">
        Manage your account identity and session. Profile editing and avatar
        upload can be added after the main MVP screens are complete.
      </p>

      <section className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="border border-[#1B202B] bg-[#0D111A] p-6">
          <div className="mx-auto grid h-28 w-28 place-items-center overflow-hidden border border-[#2A3140] bg-[#070A0F] font-mono text-3xl font-bold text-[#F5F2EB]">
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

          <div className="mt-6 text-center">
            <h2 className="text-2xl font-black tracking-[-0.04em] text-white">
              {userName}
            </h2>
            <p className="mt-2 font-mono text-xs text-slate-500">
              {userEmail}
            </p>
          </div>

          <button
            type="button"
            className="mt-6 w-full border border-[#2A3140] bg-[#070A0F] px-4 py-3 font-mono text-xs font-bold uppercase tracking-wide text-slate-300"
            disabled
          >
            Upload avatar — coming later
          </button>
        </div>

        <div className="border border-[#1B202B] bg-[#0D111A] p-6">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            Account details
          </p>

          <div className="mt-6 grid gap-4">
            <div className="border border-[#1B202B] bg-[#070A0F] p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                Name
              </p>
              <p className="mt-2 font-mono text-sm text-slate-200">
                {userName}
              </p>
            </div>

            <div className="border border-[#1B202B] bg-[#070A0F] p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                Email
              </p>
              <p className="mt-2 font-mono text-sm text-slate-200">
                {userEmail}
              </p>
            </div>

            <div className="border border-[#1B202B] bg-[#070A0F] p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                Authentication
              </p>
              <p className="mt-2 font-mono text-sm text-[#5AE89A]">
                JWT session active
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 border border-[#FF8A80] px-5 py-3 font-mono text-xs font-bold uppercase tracking-wide text-[#FF8A80] hover:bg-[#FF8A80] hover:text-[#070A0F]"
          >
            Logout
          </button>
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;