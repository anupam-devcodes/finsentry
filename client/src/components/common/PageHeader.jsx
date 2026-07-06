function PageHeader({ eyebrow, title, description, action }) {
  return (
    <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && (
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
            {eyebrow}
          </p>
        )}

        <h2 className="mt-2 text-2xl font-semibold leading-normal tracking-[-0.01em] text-white md:text-3xl">
          {title}
        </h2>

        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            {description}
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </section>
  );
}

export default PageHeader;