function LoadingState({ message = "Loading data..." }) {
  return (
    <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-emerald-400" />
        <p className="mt-4 text-sm text-slate-400">{message}</p>
      </div>
    </div>
  );
}

export default LoadingState;