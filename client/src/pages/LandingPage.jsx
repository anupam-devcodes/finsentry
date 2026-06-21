import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden px-6 py-8">
        <div className="absolute left-[-10%] top-[-20%] h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute bottom-[-15%] right-[-10%] h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

        <nav className="relative mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-emerald-500 font-black">
              F
            </div>
            <span className="text-xl font-bold">FinSentry</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold text-white hover:bg-violet-500"
            >
              Get Started
            </Link>
          </div>
        </nav>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 py-24 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="mb-5 w-fit rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200">
              AI-Powered Finance Assistant
            </p>

            <h1 className="text-5xl font-black tracking-[-0.08em] md:text-7xl">
              Track. Analyze.{" "}
              <span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
                Optimize.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              FinSentry turns your transactions, receipts, and spending data
              into clear financial insights with the help of AI.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="rounded-2xl bg-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/25 hover:bg-violet-500"
              >
                Get Started Free
              </Link>

              <Link
                to="/dashboard"
                className="rounded-2xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-bold text-slate-200 hover:bg-slate-800"
              >
                View Demo Dashboard
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Dashboard Preview</p>
                <h2 className="text-xl font-bold">Financial Overview</h2>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
                AI Active
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Income</p>
                <h3 className="mt-2 text-2xl font-bold text-emerald-300">
                  ₹75,000
                </h3>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Expense</p>
                <h3 className="mt-2 text-2xl font-bold text-rose-300">
                  ₹31,500
                </h3>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Savings</p>
                <h3 className="mt-2 text-2xl font-bold text-violet-300">
                  58%
                </h3>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-4">
              <p className="text-sm font-semibold text-violet-200">
                AI Receipt Scan
              </p>
              <p className="mt-2 text-sm text-slate-300">
                One receipt detected 3 categories: Food, Grocery, Personal Care.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;