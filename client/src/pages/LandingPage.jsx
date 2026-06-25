import { Link } from "react-router-dom";

const marketTicker = [
  { label: "NIFTY 50", change: "▲ 0.72%", value: "23,324.40", type: "up" },
  { label: "SENSEX", change: "▼ 0.15%", value: "76,532.96", type: "down" },
  { label: "GOLD", change: "▲ 0.38%", value: "₹71,245", type: "up" },
  { label: "USD/INR", change: "▲ 0.21%", value: "83.15", type: "up" },
  { label: "CRUDE", change: "▼ 0.18%", value: "$78.20", type: "down" },
  { label: "FINANCE MODE", change: "●", value: "LIVE", type: "live" },
];

const featureCards = [
  {
    number: "01",
    title: "Receipt Intelligence",
    description:
      "Scan bills and convert messy receipt data into clean transaction drafts.",
  },
  {
    number: "02",
    title: "Ledger Ready",
    description:
      "Manual entries, CSV imports, and receipts become categorized records.",
  },
  {
    number: "03",
    title: "Review Queue",
    description:
      "Edit or approve extracted rows before they enter your financial ledger.",
  },
  {
    number: "04",
    title: "Monthly AI Reports",
    description:
      "Generate plain-language summaries that explain spending behavior.",
  },
];

const steps = [
  {
    number: "01",
    title: "Add your data",
    description:
      "Create transactions manually, import a CSV file, or scan a receipt image.",
  },
  {
    number: "02",
    title: "AI structures it",
    description:
      "Receipt items are grouped into category-wise transaction drafts.",
  },
  {
    number: "03",
    title: "Review and analyze",
    description:
      "Approve entries, update analytics, and understand your monthly patterns.",
  },
];

function LandingPage() {
  const repeatedTicker = [...marketTicker, ...marketTicker];

  return (
    <main className="min-h-screen bg-[#F5F2EB] text-[#0A0A0A]">
      {/* Market ticker */}
      <section className="overflow-hidden border-b-[3px] border-[#0A0A0A] bg-[#0A0A0A] py-2 text-[#F5F2EB]">
        <div className="animate-ticker inline-block whitespace-nowrap">
          {repeatedTicker.map((item, index) => (
            <span
              key={`${item.label}-${index}`}
              className="mr-10 inline-block font-mono text-[11px] tracking-wide"
            >
              {item.label}
              <span className="mx-2 text-[#555]">|</span>
              <span
                className={
                  item.type === "up"
                    ? "text-[#5AE89A]"
                    : item.type === "down"
                    ? "text-[#FF8A80]"
                    : "text-[#FFD080]"
                }
              >
                {item.change}
              </span>
              <span className="mx-2 text-[#555]">·</span>
              {item.value}
            </span>
          ))}
        </div>
      </section>

      {/* Navbar */}
      <nav className="flex items-center justify-between border-b-2 border-[#0A0A0A] px-6 py-4 lg:px-10">
        <Link
          to="/"
          className="flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-[0.18em]"
        >
          <span className="grid h-7 w-7 place-items-center bg-[#0A0A0A] text-xs text-[#F5F2EB]">
            FS
          </span>
          <span>
            FinSentry
            <span className="block text-[9px] font-normal tracking-[0.16em] text-[#7A7A7A]">
              Ledger Intelligence
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="font-mono text-xs uppercase tracking-wide text-[#3A3A3A] hover:text-[#0A0A0A] hover:underline"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="font-mono text-xs uppercase tracking-wide text-[#3A3A3A] hover:text-[#0A0A0A] hover:underline"
          >
            How it works
          </a>
          <a
            href="#demo"
            className="font-mono text-xs uppercase tracking-wide text-[#3A3A3A] hover:text-[#0A0A0A] hover:underline"
          >
            Demo
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="border border-[#0A0A0A] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="border border-[#0A0A0A] bg-[#0A0A0A] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-[#F5F2EB]"
          >
            Start free →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="grid border-b-2 border-[#0A0A0A] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex min-h-[520px] flex-col justify-between border-[#0A0A0A] p-8 lg:border-r-2 lg:p-10 xl:p-14">
          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-[#3A3A3A]">
              AI-powered personal finance
            </p>

            <h1 className="max-w-xl text-[3.4rem] font-black leading-[0.94] tracking-[-0.08em] md:text-[5rem]">
              Know where{" "}
              <span className="text-[#C8382A]">every rupee</span> actually
              goes.
            </h1>

            <p className="mt-7 max-w-md font-mono text-sm leading-7 text-[#3A3A3A]">
              Scan receipts. Import data. Get category-wise ledger entries.
              Receive honest monthly reports by AI.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="border-2 border-[#0A0A0A] bg-[#0A0A0A] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wide text-[#F5F2EB]"
              >
                Start free →
              </Link>

              <Link
                to="/dashboard"
                className="border-2 border-[#0A0A0A] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wide"
              >
                View demo
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-6 border-t border-[#CFC8B8] pt-6 sm:grid-cols-3">
            <div>
              <p className="font-mono text-2xl font-bold">3</p>
              <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-wider">
                Ways to add data
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-[#7A7A7A]">
                Manual · CSV · Receipt
              </p>
            </div>

            <div>
              <p className="font-mono text-2xl font-bold">100%</p>
              <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-wider">
                Ledger ready
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-[#7A7A7A]">
                Clean · Categorized
              </p>
            </div>

            <div>
              <p className="font-mono text-2xl font-bold">AI</p>
              <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-wider">
                Monthly reports
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-[#7A7A7A]">
                Delivered to email
              </p>
            </div>
          </div>
        </div>

        {/* Console + extraction preview */}
        <div className="bg-[#F5F2EB] p-8 lg:p-10">
          <div className="overflow-hidden border-2 border-[#0A0A0A] bg-[#0A0A0A] shadow-[8px_8px_0_#D7D0C2]">
            <div className="flex items-center gap-2 border-b border-[#2A2A2A] px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-[#777]">
              <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
              <span className="h-2 w-2 rounded-full bg-[#FFBD2E]" />
              <span className="h-2 w-2 rounded-full bg-[#28C840]" />
              <span className="ml-3">Receipt Intelligence Console</span>
            </div>

            <div className="p-6 font-mono text-xs leading-7 text-[#888]">
              <p>
                <span className="text-[#5AE89A]">finsentry@console:~$</span>{" "}
                <span className="text-[#5AE89A]">scan receipt_1406.jpg</span>
              </p>

              <p>
                <span className="text-[#5AE89A]">[✓]</span> Receipt image
                detected
              </p>
              <p>
                <span className="text-[#5AE89A]">[✓]</span> Merchant: D Mart,
                Mohali
              </p>
              <p>
                <span className="text-[#5AE89A]">[✓]</span> Multi-category
                receipt detected
              </p>
              <p>
                <span className="text-[#5AE89A]">[✓]</span> Extracting line
                items...
              </p>
              <p>
                <span className="text-[#5AE89A]">[✓]</span> Grouping by
                category...
              </p>
              <p>
                <span className="text-[#5AE89A]">[✓]</span> 3 transactions
                created
              </p>
              <p>
                <span className="text-[#5AE89A]">[✓]</span> Saving to your
                ledger...
              </p>
              <p>
                <span className="text-[#5AE89A]">[✓]</span> Analytics updated
              </p>

              <p className="mt-2">
                <span className="text-[#5AE89A]">finsentry@console:~$</span>{" "}
                <span className="inline-block h-4 w-2 translate-y-1 bg-[#5AE89A]" />
              </p>
            </div>

            <div className="grid border-t-2 border-[#0A0A0A] bg-[#F5F2EB] text-[#0A0A0A] md:grid-cols-[180px_1fr]">
              <div className="border-[#0A0A0A] p-5 md:border-r">
                <div className="border border-[#CFC8B8] bg-[#F5F2EB] p-4 font-mono text-[10px]">
                  <p className="font-bold">D Mart</p>
                  <p className="mt-1 text-[#7A7A7A]">
                    Mohali, Punjab
                    <br />
                    14 Jun 2026 · 4:37 PM
                  </p>

                  <div className="mt-4 border-t border-[#0A0A0A] pt-3">
                    <p className="text-[#7A7A7A]">TOTAL</p>
                    <p className="text-xl font-bold">₹2,179</p>
                    <p className="mt-1 text-[#7A7A7A]">PAID VIA UPI</p>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="mb-4 font-mono text-sm font-bold">
                  → Extracted 3 transactions
                </p>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="border border-[#C8382A]/40 bg-[#F6D8D3] p-4">
                    <p className="font-mono text-xs font-bold">Food</p>
                    <p className="mt-3 font-mono text-lg font-bold">₹560</p>
                  </div>

                  <div className="border border-[#1A7A3F]/40 bg-[#DDEBDD] p-4">
                    <p className="font-mono text-xs font-bold">Grocery</p>
                    <p className="mt-3 font-mono text-lg font-bold">₹920</p>
                  </div>

                  <div className="border border-[#D28D23]/40 bg-[#F4E3C2] p-4">
                    <p className="font-mono text-xs font-bold">Clothing</p>
                    <p className="mt-3 font-mono text-lg font-bold">₹699</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section
        id="features"
        className="grid border-b-2 border-[#0A0A0A] md:grid-cols-2 xl:grid-cols-4"
      >
        {featureCards.map((feature, index) => (
          <article
            key={feature.title}
            className={`border-[#0A0A0A] p-7 ${
              index !== featureCards.length - 1 ? "xl:border-r-2" : ""
            } ${index < 2 ? "md:border-b-2 xl:border-b-0" : ""}`}
          >
            <p className="mb-5 font-mono text-xs tracking-wider text-[#7A7A7A]">
              {feature.number} — FEATURE
            </p>
            <h3 className="text-lg font-black tracking-[-0.04em]">
              {feature.title}
            </h3>
            <p className="mt-3 font-mono text-xs leading-6 text-[#3A3A3A]">
              {feature.description}
            </p>
          </article>
        ))}
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="grid border-b-2 border-[#0A0A0A] lg:grid-cols-[320px_1fr]"
      >
        <div className="border-[#0A0A0A] p-8 lg:border-r-2 lg:p-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[#7A7A7A]">
            How it works
          </p>
          <h2 className="text-4xl font-black leading-[1.05] tracking-[-0.06em]">
            From receipt to insight in seconds
          </h2>
        </div>

        <div className="grid lg:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className={`relative border-[#E2DDD2] p-8 ${
                index !== steps.length - 1 ? "lg:border-r" : ""
              }`}
            >
              <p className="text-5xl font-black text-[#D8D0C0]">
                {step.number}
              </p>
              <h3 className="mt-5 text-lg font-black tracking-[-0.04em]">
                {step.title}
              </h3>
              <p className="mt-3 font-mono text-xs leading-6 text-[#3A3A3A]">
                {step.description}
              </p>

              {index !== steps.length - 1 && (
                <span className="absolute right-[-10px] top-1/2 hidden -translate-y-1/2 bg-[#F5F2EB] font-mono text-xl text-[#7A7A7A] lg:block">
                  →
                </span>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Demo section */}
      <section
        id="demo"
        className="grid border-b-2 border-[#0A0A0A] lg:grid-cols-2"
      >
        <div className="border-[#0A0A0A] p-8 lg:border-r-2 lg:p-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[#C8382A]">
            Multi-category extraction
          </p>

          <h2 className="max-w-md text-4xl font-black leading-[1.05] tracking-[-0.06em]">
            One receipt. Multiple transactions. Cleaner analytics.
          </h2>

          <p className="mt-6 max-w-md font-mono text-sm leading-7 text-[#3A3A3A]">
            A receipt with food, groceries, and clothing should not be stored as
            one vague expense. FinSentry separates it into meaningful ledger
            entries.
          </p>
        </div>

        <div className="bg-[#EDE9DF] p-8 lg:p-10">
          <div className="border-2 border-[#0A0A0A] bg-[#F5F2EB] p-5 font-mono text-xs">
            <div className="border-b border-dashed border-[#7A7A7A] pb-4 text-center">
              <p className="font-bold tracking-wider">RELIANCE SMART BAZAAR</p>
              <p className="mt-1 text-[10px] text-[#7A7A7A]">
                Nangal · 14 Jun 2026 · 4:37 PM
              </p>
            </div>

            <div className="mt-4 space-y-1">
              <p className="text-[10px] uppercase tracking-wider text-[#7A7A7A]">
                Food & beverages
              </p>
              <div className="flex justify-between">
                <span>Maggi Noodles ×4</span>
                <span>₹280</span>
              </div>
              <div className="flex justify-between">
                <span>Amul Butter 500g</span>
                <span>₹280</span>
              </div>

              <p className="pt-2 text-[10px] uppercase tracking-wider text-[#7A7A7A]">
                Grocery
              </p>
              <div className="flex justify-between">
                <span>Rice 5kg</span>
                <span>₹420</span>
              </div>
              <div className="flex justify-between">
                <span>Dal 2kg</span>
                <span>₹320</span>
              </div>
              <div className="flex justify-between">
                <span>Cooking Oil 1L</span>
                <span>₹180</span>
              </div>

              <p className="pt-2 text-[10px] uppercase tracking-wider text-[#7A7A7A]">
                Clothing
              </p>
              <div className="flex justify-between">
                <span>Cotton T-Shirt</span>
                <span>₹699</span>
              </div>

              <div className="mt-4 flex justify-between border-t border-[#0A0A0A] pt-3 font-bold">
                <span>Total</span>
                <span>₹2,179</span>
              </div>
            </div>
          </div>

          <div className="mt-4 border border-[#1A7A3F] bg-[#1A7A3F]/5 p-4">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-[#1A7A3F]">
              AI grouped into 3 ledger entries
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="bg-[#1A7A3F] px-3 py-1 font-mono text-xs text-white">
                Food ₹560
              </span>
              <span className="bg-[#1A7A3F] px-3 py-1 font-mono text-xs text-white">
                Grocery ₹920
              </span>
              <span className="bg-[#1A7A3F] px-3 py-1 font-mono text-xs text-white">
                Clothing ₹699
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#0A0A0A] bg-[#F5F2EB] px-6 py-10 lg:px-10">
  <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
    <div>
      <p className="font-mono text-sm font-bold uppercase tracking-[0.18em]">
        FinSentry AI
      </p>

      <p className="mt-4 max-w-sm font-mono text-xs leading-6 text-[#3A3A3A]">
        Ledger intelligence for personal finance. Scan receipts, structure
        spending, and understand where your money actually goes.
      </p>

      <p className="mt-6 font-mono text-xs text-[#7A7A7A]">
        Built by Anupam Choubey · 2026
      </p>
    </div>

    <div>
      <p className="font-mono text-xs font-bold uppercase tracking-[0.18em]">
        Product
      </p>

      <div className="mt-4 flex flex-col gap-3">
        <a
          href="#features"
          className="font-mono text-xs text-[#7A7A7A] hover:text-[#0A0A0A] hover:underline"
        >
          Features
        </a>

        <a
          href="#how-it-works"
          className="font-mono text-xs text-[#7A7A7A] hover:text-[#0A0A0A] hover:underline"
        >
          How it works
        </a>

        <a
          href="#demo"
          className="font-mono text-xs text-[#7A7A7A] hover:text-[#0A0A0A] hover:underline"
        >
          Demo
        </a>
      </div>
    </div>

    <div>
      <p className="font-mono text-xs font-bold uppercase tracking-[0.18em]">
        Resources
      </p>

      <div className="mt-4 flex flex-col gap-3">
        <a
          href="https://github.com/anupam-devcodes/finsentry"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-xs text-[#7A7A7A] hover:text-[#0A0A0A] hover:underline"
        >
          GitHub
        </a>

        <a
          href="https://github.com/anupam-devcodes/finsentry#readme"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-xs text-[#7A7A7A] hover:text-[#0A0A0A] hover:underline"
        >
          Docs
        </a>
      </div>
    </div>

    <div>
      <p className="font-mono text-xs font-bold uppercase tracking-[0.18em]">
        Legal
      </p>

      <div className="mt-4 flex flex-col gap-3">
        <span className="font-mono text-xs text-[#7A7A7A]">Privacy</span>
        <span className="font-mono text-xs text-[#7A7A7A]">Terms</span>

        <a
          href="mailto:anupamchoubey0722@gmail.com"
          className="font-mono text-xs text-[#7A7A7A] hover:text-[#0A0A0A] hover:underline"
        >
          Contact
        </a>
      </div>
    </div>
  </div>
</footer>
    </main>
  );
}

export default LandingPage;