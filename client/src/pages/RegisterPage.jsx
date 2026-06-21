import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-6 text-white">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-black/40">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-emerald-500 font-black">
            F
          </div>
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="mt-2 text-sm text-slate-400">
            Start your financial journey today
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Name</label>
            <input
              type="text"
              placeholder="Anupam Kumar"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-violet-500"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold hover:bg-violet-500"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-violet-300">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default RegisterPage;