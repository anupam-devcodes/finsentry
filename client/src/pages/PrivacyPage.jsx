import { Link } from "react-router-dom";
import BrandLogo from "../components/common/BrandLogo";

function PrivacyPage() {
  return (
    <main className="paper-bg min-h-screen text-[#101010]">
      {/* Sticky navbar */}
      <nav className="sticky top-0 z-50 border-b border-[#D9D0C0] bg-[#F6F1E8]/90 px-6 py-4 backdrop-blur-xl lg:px-10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-left">
            <BrandLogo size={38} showText variant="light" />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-xl border border-[#111] bg-[#FFF9EF] px-5 py-3 text-sm font-bold hover:bg-[#EFE6D8]"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-[#0A0A0A] px-5 py-3 text-sm font-bold text-[#F5F2EB] shadow-lg shadow-black/10"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="mx-auto max-w-[800px] px-6 py-12 lg:py-20">
        <div className="rounded-3xl border border-[#D9D0C0] bg-[#FFFDF9]/80 p-8 md:p-12 shadow-sm">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C8382A]">
            Legal Information
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] md:text-4xl">
            Privacy Policy
          </h1>

          <p className="mt-2 font-mono text-xs text-[#8B8173]">
            Last updated: July 2026
          </p>

          <div className="mt-8 space-y-6 text-sm leading-7 text-[#3A3A3A]">
            <p>
              Welcome to <strong>FinSentry</strong>. We believe in complete transparency about how we handle user data. Please read this Privacy Policy carefully to understand our practices.
            </p>

            <h2 className="text-xl font-bold tracking-tight text-[#0A0A0A] pt-4 border-t border-[#EAE3D2]">
              1. Project Overview & Scope
            </h2>
            <p>
              FinSentry is a personal finance ledger workspace designed for tracking transactions, analyzing category spending, scanning receipts, and generating AI monthly summaries. This application is a <strong>portfolio and academic demo project</strong>.
            </p>
            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5 text-amber-900 text-xs leading-6">
              <strong>⚠️ IMPORTANT NOTICE:</strong> Since this is an academic and portfolio demonstration platform, <strong>do NOT enter real, sensitive banking credentials, credit card numbers, or live financial account access details</strong> anywhere on this website.
            </div>

            <h2 className="text-xl font-bold tracking-tight text-[#0A0A0A] pt-4 border-t border-[#EAE3D2]">
              2. Data We Collect and Store
            </h2>
            <p>
              To provide the features of this personal finance application, we collect and store:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Account Credentials:</strong> Basic registry information such as name, email, and securely hashed passwords.</li>
              <li><strong>Ledger Information:</strong> Manual transactions you enter (including descriptions, categories, payment methods, dates, and amounts).</li>
              <li><strong>Uploaded Files:</strong> Spreadsheet files (CSV) and receipt images uploaded for bulk importing and intelligence parsing.</li>
            </ul>

            <h2 className="text-xl font-bold tracking-tight text-[#0A0A0A] pt-4 border-t border-[#EAE3D2]">
              3. Processing and Storage Policies
            </h2>
            <p>
              All spreadsheet imports (CSV) and receipt uploads are processed strictly for the purpose of running ledger analytics, splitting items category-wise, and converting receipt items into draft ledger transactions. We do not sell, rent, or distribute any user-uploaded files or user ledger logs to external advertising networks.
            </p>

            <h2 className="text-xl font-bold tracking-tight text-[#0A0A0A] pt-4 border-t border-[#EAE3D2]">
              4. Contact Information
            </h2>
            <p>
              If you have any questions, feedback, or concerns regarding your ledger logs or account information, feel free to contact the project developer at:
              <br />
              <a
                href="mailto:anupamchoubey0722@gmail.com"
                className="font-bold text-[#C8382A] hover:underline"
              >
                anupamchoubey0722@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] px-6 py-12 text-[#F5F2EB] lg:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <BrandLogo size={40} showText variant="dark" subtitle="Ledger Intelligence" />
            </div>
            <p className="mt-6 max-w-md font-mono text-xs leading-6 text-[#A8A8A8]">
              Personal finance workspace that turns receipts, CSV imports, and manual entries into clean ledger intelligence.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em]">
              Product
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <Link to="/" className="font-mono text-xs text-[#8E8E8E] hover:text-[#F5F2EB] hover:underline">
                Home
              </Link>
            </div>
          </div>

          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em]">
              Resources
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href="https://github.com/anupam-devcodes/finsentry"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-[#8E8E8E] hover:text-[#F5F2EB] hover:underline"
              >
                GitHub ↗
              </a>
              <a
                href="https://github.com/anupam-devcodes/finsentry#readme"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-[#8E8E8E] hover:text-[#F5F2EB] hover:underline"
              >
                Docs ↗
              </a>
            </div>
          </div>

          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em]">
              Legal
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <Link to="/privacy" className="font-mono text-xs text-[#8E8E8E] hover:text-[#F5F2EB] hover:underline">
                Privacy
              </Link>
              <Link to="/terms" className="font-mono text-xs text-[#8E8E8E] hover:text-[#F5F2EB] hover:underline">
                Terms
              </Link>
              <a
                href="mailto:hariomgaaergy@gmail.com"
                className="font-mono text-xs text-[#8E8E8E] hover:text-[#F5F2EB] hover:underline"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-[1500px] flex-col gap-3 border-t border-[#2A2A2A] pt-6 font-mono text-xs text-[#777] md:flex-row md:items-center md:justify-between">
          <p>© 2026 FinSentry. Built by Anupam Choubey.</p>
          <p>Scan. Track. Save. Understand.</p>
        </div>
      </footer>
    </main>
  );
}

export default PrivacyPage;
