function EmptyState({
  title = "No data found",
  message = "There is nothing to show right now.",
  action,
}) {
  return (
    <div className="grid min-h-[260px] place-items-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
      <div>
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-lg text-slate-300">
          ∅
        </div>

        <h3 className="mt-5 text-base font-semibold leading-normal text-white">
          {title}
        </h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          {message}
        </p>

        {action && <div className="mt-5">{action}</div>}
      </div>
    </div>
  );
}

export default EmptyState;