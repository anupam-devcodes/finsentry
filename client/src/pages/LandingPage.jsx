import { Link } from "react-router-dom";
import BrandLogo from "../components/common/BrandLogo";

const marketTicker = [
  { label: "NIFTY 50", change: "▲ 0.45%", value: "24,834.85", type: "up" },
  { label: "SENSEX", change: "▲ 0.39%", value: "81,721.08", type: "up" },
  { label: "USD/INR", change: "▼ 0.11%", value: "83.12", type: "down" },
  { label: "GOLD", change: "▲ 0.28%", value: "₹72,245", type: "up" },
  { label: "MARKET", change: "●", value: "OPEN", type: "live" },
];

const capabilities = [
  {
    number: "01",
    title: "Transaction Ledger",
    icon: "▤",
    bg: "bg-[#F8DFDA]",
    border: "border-[#E9B7AF]",
    text: "Add income and expenses manually. Categorize, filter, and manage your financial records in one place.",
  },
  {
    number: "02",
    title: "Receipt Intelligence",
    icon: "▧",
    bg: "bg-[#E2EFDF]",
    border: "border-[#B8D8B4]",
    text: "Upload receipts and split one bill into multiple category-wise transaction drafts.",
  },
  {
    number: "03",
    title: "CSV Import",
    icon: "CSV",
    bg: "bg-[#E5F0FA]",
    border: "border-[#BCD5EA]",
    text: "Import transaction files and add records in bulk without entering everything manually.",
  },
  {
    number: "04",
    title: "AI Monthly Reports",
    icon: "↗",
    bg: "bg-[#F8E8C8]",
    border: "border-[#E7C98C]",
    text: "Generate plain-language summaries from your income, expenses, savings, and spending patterns.",
  },
];

const workflow = [
  {
    title: "1. Add Data",
    text: "Manual entries, CSV files, or receipt scans.",
    chips: ["Manual", "CSV", "Receipt"],
  },
  {
    title: "2. Organized Ledger",
    text: "Your data becomes structured and categorized.",
    rows: [
      ["14 Jun", "Food", "₹560"],
      ["14 Jun", "Grocery", "₹920"],
      ["15 Jun", "Income", "₹18,000"],
    ],
  },
  {
    title: "3. Analytics Dashboard",
    text: "Understand spending with charts and category trends.",
    chart: true,
  },
  {
    title: "4. AI Report",
    text: "Get monthly summaries delivered to your email.",
    report: true,
  },
];

function LandingPage() {
  const repeatedTicker = [...marketTicker, ...marketTicker];

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main id="top" className="paper-bg min-h-screen overflow-x-hidden text-[#101010]">
      {/* Market ticker */}
      <section className="overflow-hidden border-b border-[#191919] bg-[#0A0A0A] py-2 text-[#F5F2EB]">
        <div className="animate-ticker inline-block whitespace-nowrap">
          {repeatedTicker.map((item, index) => (
            <span
              key={`${item.label}-${index}`}
              className="mr-12 inline-block font-mono text-[11px] tracking-wide"
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

      {/* Sticky navbar */}
      <nav className="sticky top-0 z-50 border-b border-[#D9D0C0] bg-[#F6F1E8]/90 px-6 py-4 backdrop-blur-xl lg:px-10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between">
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-3 text-left"
          >
            <BrandLogo size={38} showText variant="light" />
          </button>

          <div className="hidden items-center gap-9 md:flex">
            <a
              href="#features"
              className="text-sm font-semibold text-[#2A2A2A] hover:text-[#C8382A]"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-semibold text-[#2A2A2A] hover:text-[#C8382A]"
            >
              How it works
            </a>
            <a
              href="#demo"
              className="text-sm font-semibold text-[#2A2A2A] hover:text-[#C8382A]"
            >
              Demo
            </a>
            <a
              href="#footer"
              className="text-sm font-semibold text-[#2A2A2A] hover:text-[#C8382A]"
            >
              Contact
            </a>
          </div>

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

      {/* Hero */}
      <section className="px-6 py-10 lg:px-10 lg:py-14">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="min-w-0">
            <div className="mb-7 w-fit rounded-full border border-[#E7B0A8] bg-[#FFF2ED] px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#C8382A]">
              Track → Organize → Understand
            </div>

         <h1 className="max-w-[680px] text-[clamp(2.4rem,4.5vw,4.2rem)] font-black leading-[1.02] tracking-[-0.035em] text-[#0A0A0A]">
  <span className="block">Know where</span>
  <span className="block">every <span className="text-[#C8382A]">rupee</span></span>
  <span className="block">actually goes.</span>
</h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-[#3A3A3A]">
              Track transactions, import CSV data, scan receipts, and get
              AI-powered insights that help you make smarter financial
              decisions.
            </p>

            <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
              <div className="soft-card rounded-2xl p-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#F8DFDA] font-mono text-xs">
                  ▤
                </span>
                <p className="mt-4 font-bold leading-tight">
                  Multiple ways to add data
                </p>
                <p className="mt-1 font-mono text-[10px] text-[#6F665B]">
                  Manual · CSV · Receipt
                </p>
              </div>

              <div className="soft-card rounded-2xl p-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#E2EFDF] font-mono text-xs">
                  ✓
                </span>
                <p className="mt-4 font-bold leading-tight">
                  Clean ledger & categories
                </p>
                <p className="mt-1 font-mono text-[10px] text-[#6F665B]">
                  Structured · Filtered
                </p>
              </div>

              <div className="soft-card rounded-2xl p-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#E5F0FA] font-mono text-xs">
                  ↗
                </span>
                <p className="mt-4 font-bold leading-tight">
                  AI reports & insights
                </p>
                <p className="mt-1 font-mono text-[10px] text-[#6F665B]">
                  Delivered to email
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="rounded-xl bg-[#0A0A0A] px-7 py-4 text-sm font-bold text-[#F5F2EB] shadow-xl shadow-black/10"
              >
                Get Started Free →
              </Link>

              <Link
                to="/dashboard"
                className="rounded-xl border border-[#111] bg-[#FFF9EF] px-7 py-4 text-sm font-bold hover:bg-[#EFE6D8]"
              >
                View Demo
              </Link>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative flex min-w-0 items-center">
            <div className="absolute right-5 top-8 hidden rotate-3 rounded-2xl border border-[#E7CA71] bg-[#FFF0A8] p-6 shadow-xl shadow-black/10 xl:block">
              <p className="mb-4 font-mono text-xs font-bold uppercase">
                Why FinSentry?
              </p>

              {[
                "Transaction ledger",
                "Receipt intelligence",
                "CSV import support",
                "Monthly AI reports",
              ].map((item) => (
                <p
                  key={item}
                  className="mb-3 flex gap-2 font-mono text-[11px] text-[#1E1E1E]"
                >
                  <span>☑</span> {item}
                </p>
              ))}

              <p className="mt-5 rotate-[-3deg] font-mono text-xs italic">
                All in one place!
              </p>
            </div>

            <div className="console-shadow w-full overflow-hidden rounded-[1.6rem] border border-[#171717] bg-[#0A0A0A]">
              <div className="flex items-center justify-between border-b border-[#2A2A2A] px-5 py-3 font-mono text-[11px] text-[#777]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                  <span className="ml-3 text-[#F5F2EB]">
                    FinSentry Console
                  </span>
                </div>

                <span className="hidden text-[#5AE89A] sm:inline">
                  STATUS: ACTIVE ●
                </span>
              </div>

              <div className="p-6 font-mono text-xs leading-7 text-[#9AA0A6]">
                <p>
                  <span className="text-[#5AE89A]">&gt;</span> Scanning
                  receipt_1406.jpg
                </p>
                <p>
                  <span className="text-[#5AE89A]">&gt;</span> Detecting
                  merchant, date and items...
                </p>
                <p>
                  <span className="text-[#5AE89A]">&gt;</span> Merchant
                  detected: D Mart, Mohali
                </p>
                <p>
                  <span className="text-[#5AE89A]">&gt;</span> Multi-category
                  receipt detected
                </p>
                <p>
                  <span className="text-[#5AE89A]">&gt;</span> 3 transaction
                  drafts created
                </p>
                <p>
                  <span className="text-[#5AE89A]">&gt;</span> Waiting for
                  review before saving
                </p>
              </div>

              <div className="grid gap-4 border-t border-[#2A2A2A] p-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="relative rounded-xl bg-[#F8F3EA] p-5 text-[#0A0A0A]">
                  <p className="text-center text-xl font-black">
                    RECEIPT PREVIEW
                  </p>

                  <p className="mt-3 text-center font-mono text-sm font-bold">
                    D Mart
                  </p>

                  <p className="text-center font-mono text-[10px] text-[#7A7A7A]">
                    Mohali · 14 Jun 2026 · 04:37 PM
                  </p>

                  <div className="my-4 border-t border-dashed border-[#7A7A7A]" />

                  <div className="space-y-2 font-mono text-xs">
                    <p className="flex justify-between">
                      <span>Food items</span>
                      <span>₹560</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Grocery items</span>
                      <span>₹920</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Clothing</span>
                      <span>₹699</span>
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between border-t border-[#D8D0C0] pt-3 font-mono font-bold">
                    <span>TOTAL</span>
                    <span>₹2,179</span>
                  </div>
                </div>

                <div className="rounded-xl border border-[#2A2A2A] bg-[#111318] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-mono text-xs font-bold uppercase tracking-wide text-[#F5F2EB]">
                      Extracted Transactions{" "}
                      <span className="text-[#5AE89A]">(3)</span>
                    </p>

                    <span className="rounded-md border border-[#1A7A3F] px-2 py-1 font-mono text-[10px] text-[#5AE89A]">
                      Confidence: 92%
                    </span>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    {[
                      {
                        title: "Food",
                        items: "2 items",
                        amount: "₹560",
                        bg: "bg-[#F8DFDA]",
                        border: "border-[#E9B7AF]",
                        icon: "🍴",
                      },
                      {
                        title: "Grocery",
                        items: "3 items",
                        amount: "₹920",
                        bg: "bg-[#E2EFDF]",
                        border: "border-[#B8D8B4]",
                        icon: "🛒",
                      },
                      {
                        title: "Clothing",
                        items: "1 item",
                        amount: "₹699",
                        bg: "bg-[#F8E8C8]",
                        border: "border-[#E7C98C]",
                        icon: "⌂",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className={`${item.bg} ${item.border} min-w-0 rounded-xl border p-3 text-[#0A0A0A]`}
                      >
                        <p className="text-lg">{item.icon}</p>
                        <p className="mt-3 text-sm font-bold">{item.title}</p>
                        <p className="font-mono text-[10px] text-[#555]">
                          {item.items}
                        </p>
                        <p className="mt-4 whitespace-nowrap font-mono text-2xl font-bold tracking-[-0.08em]">
                          {item.amount}
                        </p>
                        <button className="mt-3 w-full rounded-lg border border-[#0A0A0A]/20 py-2 font-mono text-[10px] font-bold">
                          Review
                        </button>
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 rounded-lg border border-[#2A2A2A] px-3 py-2 font-mono text-[11px] text-[#9AA0A6]">
                    ✓ Review these drafts before saving to ledger
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    
     {/* Features */}
<section id="features" className="px-6 py-10 lg:px-10">
  <div className="soft-card mx-auto max-w-[1500px] rounded-[2rem] bg-[#F4EDDB]/85 p-4 lg:p-5">
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {capabilities.map((item) => (
        <article
          key={item.title}
          className="rounded-2xl border border-[#D9D0C0] bg-[#FFF9EF]/80 p-6"
        >
          <div className="flex items-start gap-5">
            <span
              className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl border ${item.border} ${item.bg} font-mono text-xs font-bold`}
            >
              {item.icon}
            </span>

            <div>
              <p className="font-mono text-xs font-bold text-[#C8382A]">
                {item.number}
              </p>

              <h3 className="mt-1 text-lg font-black tracking-[-0.04em]">
                {item.title}
              </h3>

              <p className="mt-2 font-mono text-xs leading-6 text-[#4A4037]">
                {item.text}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>

     {/* Workflow */}
<section id="how-it-works" className="px-6 py-10 lg:px-10">
  <div className="soft-card mx-auto max-w-[1500px] rounded-[2rem] bg-[#F4EDDB]/85 p-6 lg:p-8">
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#C8382A]">
          How it works
        </p>

        <h2 className="mt-3 max-w-2xl text-[clamp(2rem,3.5vw,3.2rem)] font-black leading-[1.05] tracking-[-0.035em]">
          From data to clarity.
        </h2>
      </div>

      <p className="max-w-md font-mono text-xs leading-6 text-[#4A4037]">
        FinSentry brings manual entries, CSV imports, and receipt scans into one
        clean ledger, then turns that data into analytics and AI summaries.
      </p>
    </div>

    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {workflow.map((item, index) => (
        <div key={item.title} className="relative">
          <div className="h-full min-h-[260px] rounded-2xl border border-[#D9D0C0] bg-[#FFF9EF]/90 p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <span className="rounded-full bg-[#0A0A0A] px-3 py-1 font-mono text-[10px] font-bold text-[#F5F2EB]">
                STEP {String(index + 1).padStart(2, "0")}
              </span>

              {index !== workflow.length - 1 && (
                <span className="hidden font-mono text-lg text-[#8B8173] xl:block">
                  →
                </span>
              )}
            </div>

            <h3 className="text-xl font-black tracking-[-0.04em]">
              {item.title.replace(/^\d+\.\s*/, "")}
            </h3>

            <p className="mt-2 font-mono text-[11px] leading-5 text-[#4A4037]">
              {item.text}
            </p>

            {item.chips && (
              <div className="mt-5 flex flex-wrap gap-2">
                {item.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-xl border border-[#D9D0C0] bg-[#F6F1E8] px-3 py-2 font-mono text-[10px]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}

            {item.rows && (
              <div className="mt-5 overflow-hidden rounded-xl border border-[#D9D0C0] bg-[#F6F1E8] font-mono text-[10px]">
                {item.rows.map((row) => (
                  <div
                    key={row.join("-")}
                    className="grid grid-cols-3 border-b border-[#E9E0D0] px-3 py-2 last:border-b-0"
                  >
                    <span>{row[0]}</span>
                    <span>{row[1]}</span>
                    <span className="text-right">{row[2]}</span>
                  </div>
                ))}
              </div>
            )}

            {item.chart && (
              <div className="mt-5 flex items-center gap-4">
                <div className="h-20 w-20 shrink-0 rounded-full border-[14px] border-[#1A7A3F] border-r-[#C8382A] border-t-[#D28D23]" />

                <div className="space-y-2 font-mono text-[10px]">
                  <p>Food 28%</p>
                  <p>Grocery 35%</p>
                  <p>Shopping 18%</p>
                  <p>Others 19%</p>
                </div>
              </div>
            )}

            {item.report && (
              <div className="mt-5 rounded-xl border border-[#D9D0C0] bg-[#F6F1E8] p-4">
                <p className="font-mono text-[10px] font-bold uppercase">
                  Monthly Summary
                </p>

                <div className="mt-3 space-y-2">
                  <div className="h-2 w-full rounded-full bg-[#D8D0C0]" />
                  <div className="h-2 w-4/5 rounded-full bg-[#D8D0C0]" />
                  <div className="h-2 w-3/5 rounded-full bg-[#D8D0C0]" />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Smart extraction */}
      <section id="demo" className="px-6 py-10 lg:px-10">
        <div className="soft-card mx-auto grid max-w-[1500px] items-center gap-8 rounded-[2rem] bg-[#F4EDDB]/85 p-7 lg:grid-cols-[320px_1fr]">
          <div>
            <div className="mb-4 inline-block rounded-full border border-[#9BC49A] bg-[#EEF8EA] px-4 py-2 font-mono text-xs font-bold uppercase text-[#1A7A3F]">
              Smart Extraction
            </div>

            <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-black leading-[1.06] tracking-[-0.035em]">
              One receipt.
              <br />
              Multiple categories.
            </h2>

            <p className="mt-5 font-mono text-xs leading-6 text-[#4A4037]">
              FinSentry reads line items, groups them by spending type, and
              creates category-wise transaction drafts before anything is saved.
            </p>
          </div>

          <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1.35fr_auto_1fr]">
            <div className="rounded-2xl border border-[#D9D0C0] bg-[#FFF9EF] p-5">
              <p className="font-mono text-xs font-bold uppercase tracking-wide text-[#8B8173]">
                Step 01
              </p>
              <h3 className="mt-2 font-black">Receipt</h3>

              <div className="mt-4 space-y-2 font-mono text-[11px]">
                <p className="flex justify-between border-b border-[#E9E0D0] pb-2">
                  <span>D Mart</span>
                  <span>₹2,179</span>
                </p>
                <p className="text-[#7A7A7A]">Food + Grocery + Clothing</p>
                <p className="text-[#7A7A7A]">Paid via UPI</p>
              </div>
            </div>

            <div className="hidden items-center justify-center font-mono text-2xl lg:flex">
              →
            </div>

            <div className="rounded-2xl border border-[#171717] bg-[#0A0A0A] p-5 text-[#F5F2EB]">
              <p className="font-mono text-xs font-bold uppercase tracking-wide text-[#5AE89A]">
                Step 02
              </p>
              <h3 className="mt-2 font-black">AI Extraction</h3>

              <div className="mt-4 space-y-2 font-mono text-[11px] text-[#9AA0A6]">
                <p>✓ Merchant detected</p>
                <p>✓ Items grouped</p>
                <p>✓ Categories created</p>
              </div>
            </div>

            <div className="hidden items-center justify-center font-mono text-2xl lg:flex">
              →
            </div>

            <div className="rounded-2xl border border-[#D9D0C0] bg-[#FFF9EF] p-5">
              <p className="font-mono text-xs font-bold uppercase tracking-wide text-[#8B8173]">
                Step 03
              </p>
              <h3 className="mt-2 font-black">Category Drafts</h3>

              <div className="mt-4 grid gap-3">
                <div className="rounded-xl border border-[#E9B7AF] bg-[#F8DFDA] p-3">
                  <p className="font-mono text-[10px] uppercase text-[#7A7A7A]">
                    Food
                  </p>
                  <p className="mt-1 font-mono text-lg font-bold">₹560</p>
                </div>

                <div className="rounded-xl border border-[#B8D8B4] bg-[#E2EFDF] p-3">
                  <p className="font-mono text-[10px] uppercase text-[#7A7A7A]">
                    Grocery
                  </p>
                  <p className="mt-1 font-mono text-lg font-bold">₹920</p>
                </div>

                <div className="rounded-xl border border-[#E7C98C] bg-[#F8E8C8] p-3">
                  <p className="font-mono text-[10px] uppercase text-[#7A7A7A]">
                    Clothing
                  </p>
                  <p className="mt-1 font-mono text-lg font-bold">₹699</p>
                </div>
              </div>
            </div>

            <div className="hidden items-center justify-center font-mono text-2xl lg:flex">
              →
            </div>

            <div className="rounded-2xl border border-[#D9D0C0] bg-[#FFF9EF] p-5">
              <p className="font-mono text-xs font-bold uppercase tracking-wide text-[#8B8173]">
                Step 04
              </p>
              <h3 className="mt-2 font-black">Review & Save</h3>

              <div className="mt-4 space-y-2 font-mono text-[11px]">
                <p className="rounded-xl border border-[#E9E0D0] bg-[#F6F1E8] px-3 py-2">
                  Edit extracted rows
                </p>
                <p className="rounded-xl border border-[#E9E0D0] bg-[#F6F1E8] px-3 py-2">
                  Save selected drafts
                </p>
                <p className="rounded-xl border border-[#E9E0D0] bg-[#F6F1E8] px-3 py-2">
                  Update analytics
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-10 lg:px-10">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-6 rounded-[2rem] border border-[#E8B9AE] bg-[#F8DFDA] p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-[-0.05em]">
              Ready to take control of your finances?
            </h2>
            <p className="mt-2 font-mono text-xs text-[#4A4037]">
              Scan. Track. Save. Understand.
            </p>
          </div>

          <Link
            to="/register"
            className="w-fit rounded-xl bg-[#0A0A0A] px-8 py-4 text-sm font-bold text-[#F5F2EB] shadow-xl shadow-black/10"
          >
            Get Started Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="footer"
        className="bg-[#0A0A0A] px-6 py-12 text-[#F5F2EB] lg:px-10"
      >
        <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <BrandLogo size={40} showText variant="dark" subtitle="Ledger Intelligence" />
            </div>

            <p className="mt-6 max-w-md font-mono text-xs leading-6 text-[#A8A8A8]">
              Personal finance workspace that turns receipts, CSV imports, and
              manual entries into clean ledger intelligence.
            </p>

            <div className="mt-6 inline-block rounded-xl border border-[#2A2A2A] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8E8E8E]">
              Built with clarity. Designed for control.
            </div>
          </div>

          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em]">
              Product
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href="#features"
                className="font-mono text-xs text-[#8E8E8E] hover:text-[#F5F2EB] hover:underline"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="font-mono text-xs text-[#8E8E8E] hover:text-[#F5F2EB] hover:underline"
              >
                How it works
              </a>
              <a
                href="#demo"
                className="font-mono text-xs text-[#8E8E8E] hover:text-[#F5F2EB] hover:underline"
              >
                Demo
              </a>
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
              <span className="font-mono text-xs text-[#8E8E8E]">Privacy</span>
              <span className="font-mono text-xs text-[#8E8E8E]">Terms</span>
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

export default LandingPage;