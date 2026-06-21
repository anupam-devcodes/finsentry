function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="relative grid min-h-screen place-items-center overflow-hidden px-6 py-10">
        <div className="absolute left-[-10%] top-[-20%] h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute bottom-[-15%] right-[-10%] h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative w-full max-w-5xl rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-12">
          <div className="mb-20 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-emerald-500 font-black">
              F
            </div>
            <span className="text-xl font-bold tracking-tight">FinSentry</span>
          </div>

          <div className="max-w-3xl">
            <p className="mb-5 w-fit rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200">
              AI-Powered Finance Assistant
            </p>

            <h1 className="text-5xl font-black tracking-[-0.08em] text-white md:text-7xl lg:text-8xl">
              Track. Analyze.{" "}
              <span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
                Optimize.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              FinSentry helps you manage transactions, scan receipts with AI,
              analyze spending patterns, and generate intelligent monthly
              reports.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-2xl bg-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-500">
                Get Started
              </button>

              <button className="rounded-2xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-bold text-slate-200 transition hover:bg-slate-800">
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;