function ErrorState({ title = "Something went wrong", message, onRetry }) {
  return (
    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
      <p className="text-base font-semibold text-red-200">{title}</p>

      {message && <p className="mt-2 text-sm text-red-100/70">{message}</p>}

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-400"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorState;