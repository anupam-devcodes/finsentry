import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-6 text-center text-white">
      <div>
        <p className="text-sm font-semibold text-violet-300">404</p>
        <h1 className="mt-2 text-4xl font-bold">Page not found</h1>
        <p className="mt-3 text-slate-400">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold hover:bg-violet-500"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;