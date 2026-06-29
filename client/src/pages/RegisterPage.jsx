import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../hooks/useAuth";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
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
    await register(formData);

    toast.success("Account created successfully");
    navigate("/dashboard");
  } catch (error) {
    toast.error(error.message || "Registration failed");
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
          to="/login"
          className="border border-[#0A0A0A] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide"
        >
          Log in
        </Link>
      </nav>

      <section className="grid min-h-[calc(100vh-65px)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="hidden border-r-2 border-[#0A0A0A] p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="mb-5 border-l-4 border-[#1A7A3F] pl-3 font-mono text-xs uppercase tracking-[0.22em] text-[#7A7A7A]">
              Start your ledger
            </p>

            <h1 className="max-w-lg text-6xl font-black leading-[0.95] tracking-[-0.08em]">
              Build clarity from your first transaction.
            </h1>

            <p className="mt-7 max-w-md font-mono text-sm leading-7 text-[#3A3A3A]">
              Create your private workspace to track transactions, scan
              receipts, import CSV files, and generate monthly AI insights.
            </p>
          </div>

          <div className="grid gap-3 font-mono text-xs">
            <div className="border-2 border-[#0A0A0A] bg-[#EDE9DF] p-4">
              <p className="font-bold">01 — Create account</p>
              <p className="mt-1 text-[#7A7A7A]">
                Your private ledger workspace is created.
              </p>
            </div>

            <div className="border-2 border-[#0A0A0A] bg-[#EDE9DF] p-4">
              <p className="font-bold">02 — Add money data</p>
              <p className="mt-1 text-[#7A7A7A]">
                Manual, CSV, or receipt scan.
              </p>
            </div>

            <div className="border-2 border-[#0A0A0A] bg-[#EDE9DF] p-4">
              <p className="font-bold">03 — Understand patterns</p>
              <p className="mt-1 text-[#7A7A7A]">
                Charts and AI insights explain spending behavior.
              </p>
            </div>
          </div>
        </div>

        <div className="grid place-items-center px-6 py-10">
          <div className="w-full max-w-md border-2 border-[#0A0A0A] bg-[#F5F2EB] p-8 shadow-[8px_8px_0_#D7D0C2]">
            <div className="mb-8">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#7A7A7A]">
                New workspace
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.06em]">
                Register
              </h2>
              <p className="mt-3 font-mono text-xs leading-6 text-[#3A3A3A]">
                Create your account and start organizing your personal finance
                ledger.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wide">
                  Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your name"
                  required
                  className="w-full border-2 border-[#0A0A0A] bg-[#F5F2EB] px-4 py-3 font-mono text-sm outline-none placeholder:text-[#9A9488] focus:bg-white"
                />
              </div>

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
                {isSubmitting ? "Creating account..." : "Create account →"}
              </button>
            </form>

            <p className="mt-6 font-mono text-xs text-[#3A3A3A]">
              Already have an account?{" "}
              <Link to="/login" className="font-bold underline">
                Login instead
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;