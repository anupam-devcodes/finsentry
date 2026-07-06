/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getDashboardAnalytics } from "../api/analyticsApi";
import { formatCurrency, formatPercentage } from "../utils/formatCurrency";

import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import StatCard from "../components/dashboard/StatCard";
import CashflowChart from "../components/dashboard/CashflowChart";
import ExpenseDonutChart from "../components/dashboard/ExpenseDonutChart";

function extractDashboardData(response) {
  // Backend shape: { success, message, data: { dashboard: { summary, expenseByCategory, monthlyTrend, recentTransactions } } }
  // analyticsApi.js returns response.data (axios unwraps once), so we receive { success, message, data: { dashboard } }
  return (
    response?.data?.dashboard ||
    response?.dashboard ||
    response?.data ||
    response ||
    {}
  );
}

function getNumber(...values) {
  for (const value of values) {
    const numberValue = Number(value);

    if (!Number.isNaN(numberValue)) {
      return numberValue;
    }
  }

  return 0;
}


function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchDashboardData() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await getDashboardAnalytics();
      const data = extractDashboardData(response);

      setDashboardData(data);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to load dashboard data.";

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <LoadingState message="Loading your command center..." />;
  }

  if (errorMessage) {
    return (
      <ErrorState
        title="Dashboard could not be loaded"
        message={errorMessage}
        onRetry={fetchDashboardData}
      />
    );
  }

  const summary = dashboardData?.summary || dashboardData || {};

  const totalIncome = getNumber(
    summary?.totalIncome,
    summary?.income,
    dashboardData?.totalIncome,
    dashboardData?.income
  );

  const totalExpense = getNumber(
    summary?.totalExpense,
    summary?.expense,
    summary?.totalExpenses,
    dashboardData?.totalExpense,
    dashboardData?.expense,
    dashboardData?.totalExpenses
  );

  const balance = getNumber(
    summary?.balance,
    summary?.netBalance,
    dashboardData?.balance,
    dashboardData?.netBalance,
    totalIncome - totalExpense
  );

  const savingsRate =
    totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  const recentTransactions =
    dashboardData?.recentTransactions ||
    dashboardData?.transactions ||
    dashboardData?.latestTransactions ||
    [];

  const categoryBreakdown =
    dashboardData?.expenseByCategory ||
    dashboardData?.categoryBreakdown ||
    dashboardData?.expensePieChartBreakdown ||
    dashboardData?.categories ||
    [];

  const monthlyTrend =
    dashboardData?.monthlyTrend ||
    dashboardData?.monthlyTrendData ||
    dashboardData?.chartData ||
    [];

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
            Overview
          </p>

         <h2 className="mt-2 text-2xl font-semibold leading-normal tracking-[-0.015em] text-white md:text-3xl">
  Your Money Overview
</h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
  Track income, expenses, balance, spending categories, and recent
  activity from one private finance workspace.
</p>
        </div>

        <button
          type="button"
          onClick={fetchDashboardData}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition hover:bg-white/[0.08]"
        >
          ↻ Refresh
        </button>
      </section>

      {/* KPI cards */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Income"
          value={formatCurrency(totalIncome)}
          helper="Money received in the selected period"
          tone="income"
          icon="↗"
        />

        <StatCard
          title="Total Expense"
          value={formatCurrency(totalExpense)}
          helper="Money spent in the selected period"
          tone="expense"
          icon="↘"
        />

        <StatCard
          title="Balance"
          value={formatCurrency(balance)}
          helper="Income minus expenses"
          tone="balance"
          icon="▣"
        />

        <StatCard
          title="Savings Rate"
          value={formatPercentage(savingsRate)}
          helper="Estimated saving percentage"
          tone="savings"
          icon="◎"
        />
      </section>

      {/* Middle grid */}
      <section className="grid gap-5 xl:grid-cols-[1.45fr_0.9fr]">
        {/* Cashflow trend */}
        <div className="rounded-3xl border border-white/10 bg-[#0B111C] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
          <div className="mb-5">
            <h3 className="text-lg font-semibold leading-normal tracking-[-0.01em] text-white">
              Cashflow Trend
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Monthly income vs expense overview
            </p>
          </div>

          <CashflowChart data={monthlyTrend} />
        </div>

        {/* Expense breakdown */}
        <div className="rounded-3xl border border-white/10 bg-[#0B111C] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
          <div className="mb-5">
            <h3 className="text-lg font-semibold leading-normal tracking-[-0.01em] text-white">
              Expense Breakdown
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Share of expenses by category
            </p>
          </div>

          <ExpenseDonutChart
            data={categoryBreakdown}
            totalExpense={totalExpense}
          />
        </div>
      </section>

      {/* Bottom grid */}
      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        {/* Recent transactions */}
        <div className="rounded-3xl border border-white/10 bg-[#0B111C] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold leading-normal tracking-[-0.01em] text-white">
                Recent Transactions
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Latest ledger activity
              </p>
            </div>

            <Link
              to="/transactions"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-white hover:bg-white/[0.08]"
            >
              View all →
            </Link>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            {recentTransactions.length > 0 ? (
              <div className="divide-y divide-white/10">
                {recentTransactions.slice(0, 5).map((transaction) => {
                  const title =
                    transaction?.title ||
                    transaction?.name ||
                    transaction?.description ||
                    "Untitled Transaction";

                  const category = transaction?.category || "Uncategorized";
                  const type = transaction?.type || "expense";
                  const amount = getNumber(transaction?.amount);
                  const isIncome = type === "income";

                  return (
                    <div
                      key={transaction?.id || transaction?._id || `${title}-${amount}`}
                      className="grid gap-3 bg-white/[0.02] p-4 sm:grid-cols-[1fr_150px_120px]"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-white">
                          {title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {category}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                          isIncome
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "bg-red-400/10 text-red-300"
                        }`}
                      >
                        {type}
                      </span>

                      <p
                        className={`text-sm font-extrabold sm:text-right ${
                          isIncome ? "text-emerald-300" : "text-red-300"
                        }`}
                      >
                        {isIncome ? "+" : "-"}
                        {formatCurrency(amount)}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid min-h-[220px] place-items-center bg-white/[0.02] p-6 text-center">
                <div>
                  <p className="text-sm font-semibold text-white">
                    No recent transactions yet
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Your latest ledger entries will appear here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AI receipt activity */}
        <div className="rounded-3xl border border-white/10 bg-[#0B111C] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold leading-normal tracking-[-0.01em] text-white">
                AI Receipt Activity
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Receipt intelligence status
              </p>
            </div>

            <Link
              to="/scan-receipt"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-white hover:bg-white/[0.08]"
            >
              Scan →
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {[
              {
                title: "Upload receipt",
                text: "Send image to AI extraction pipeline",
                status: "Ready",
              },
              {
                title: "Review drafts",
                text: "Check extracted category-wise rows",
                status: "Manual review",
              },
              {
                title: "Save to ledger",
                text: "Approved drafts update analytics",
                status: "Controlled",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {item.text}
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;