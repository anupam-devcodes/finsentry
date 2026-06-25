import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../hooks/useAuth";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      await login(formData);

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Login failed";

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F2EB] text-[#0A0A0A]">
      <nav className="flex items-center justify-between border-b-2 border-[#0A0A0A] px-6 py-4 lg:px-10">
        <Link
          to="/"
          className="flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-[0.18em]"
        >
          <span className="grid h-7 w-7 place-items-center bg-[#0A0A0A] text-xs text-[#F5F2EB]">
            FS
          </span>
          FinSentry
        </Link>

        <Link
          to="/register"
          className="border border-[#0A0A0A] bg-[#0A0A0A] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-[#F5F2EB]"
        >
          Create account →
        </Link>
      </nav>

      <section className="grid min-h-[calc(100vh-65px)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="hidden border-r-2 border-[#0A0A0A] p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="mb-5 border-l-4 border-[#C8382A] pl-3 font-mono text-xs uppercase tracking-[0.22em] text-[#7A7A7A]">
              Welcome back
            </p>

            <h1 className="max-w-lg text-6xl font-black leading-[0.95] tracking-[-0.08em]">
              Continue your money story.
            </h1>

            <p className="mt-7 max-w-md font-mono text-sm leading-7 text-[#3A3A3A]">
              Open your private ledger workspace, review transactions, scan
              receipts, and understand where your money actually goes.
            </p>
          </div>

          <div className="border-2 border-[#0A0A0A] bg-[#0A0A0A] p-5 font-mono text-xs text-[#F5F2EB]">
            <p className="text-[#5AE89A]">finsentry@auth:~$ login</p>
            <p className="mt-3 text-[#888]">→ Verifying account credentials</p>
            <p className="text-[#888]">→ Loading private ledger workspace</p>
            <p className="text-[#5AE89A]">✓ Dashboard ready</p>
          </div>
        </div>

        <div className="grid place-items-center px-6 py-10">
          <div className="w-full max-w-md border-2 border-[#0A0A0A] bg-[#F5F2EB] p-8 shadow-[8px_8px_0_#D7D0C2]">
            <div className="mb-8">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#7A7A7A]">
                Account access
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.06em]">
                Login
              </h2>
              <p className="mt-3 font-mono text-xs leading-6 text-[#3A3A3A]">
                Enter your credentials to access your finance command center.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wide">
                  Email
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full border-2 border-[#0A0A0A] bg-[#F5F2EB] px-4 py-3 font-mono text-sm outline-none placeholder:text-[#9A9488] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wide">
                  Password
                </label>
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full border-2 border-[#0A0A0A] bg-[#F5F2EB] px-4 py-3 font-mono text-sm outline-none placeholder:text-[#9A9488] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full border-2 border-[#0A0A0A] bg-[#0A0A0A] px-5 py-3 font-mono text-xs font-bold uppercase tracking-wide text-[#F5F2EB] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Logging in..." : "Login →"}
              </button>
            </form>

            <p className="mt-6 font-mono text-xs text-[#3A3A3A]">
              New to FinSentry?{" "}
              <Link to="/register" className="font-bold underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;