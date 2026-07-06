import { useEffect, useMemo, useState } from "react";

import { getTransactions } from "../api/transactionApi";

import PageHeader from "../components/common/PageHeader";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionTable from "../components/transactions/TransactionTable";

const defaultFilters = {
  search: "",
  type: "",
  category: "",
  page: 1,
  limit: 10,
  sortBy: "date",
  sortOrder: "desc",
};

function extractTransactions(response) {
  return response?.data?.transactions || response?.transactions || [];
}

function extractPagination(response) {
  return (
    response?.pagination || {
      totalTransactions: 0,
      totalPages: 1,
      currentPage: 1,
      limit: 10,
      hasNextPage: false,
      hasPreviousPage: false,
    }
  );
}

function buildQueryParams(filters) {
  const params = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      params[key] = value;
    }
  });

  return params;
}

function TransactionsPage() {
  const [filters, setFilters] = useState(defaultFilters);
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({
    totalTransactions: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const queryParams = useMemo(() => buildQueryParams(filters), [filters]);

  async function fetchTransactions() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await getTransactions(queryParams);

      setTransactions(extractTransactions(response));
      setPagination(extractPagination(response));
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to load transactions.";

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [queryParams]);

  function handleResetFilters() {
    setFilters(defaultFilters);
  }

  function goToPage(pageNumber) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      page: pageNumber,
    }));
  }

  const hasTransactions = transactions.length > 0;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Ledger"
        title="Transactions"
        description="Review your income, expenses, categories, payment methods, and transaction history."
        action={
          <button
            type="button"
            className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold leading-normal text-[#06100B] transition hover:bg-emerald-300"
          >
            + Add Transaction
          </button>
        }
      />

      <TransactionFilters
        filters={filters}
        onChange={setFilters}
        onReset={handleResetFilters}
      />

      {isLoading && <LoadingState message="Loading transactions..." />}

      {!isLoading && errorMessage && (
        <ErrorState
          title="Transactions could not be loaded"
          message={errorMessage}
          onRetry={fetchTransactions}
        />
      )}

      {!isLoading && !errorMessage && !hasTransactions && (
        <EmptyState
          title="No transactions found"
          message="Try changing filters or add your first income or expense transaction."
          action={
            <button
              type="button"
              className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-[#06100B] transition hover:bg-emerald-300"
            >
              + Add Transaction
            </button>
          }
        />
      )}

      {!isLoading && !errorMessage && hasTransactions && (
        <>
          <TransactionTable transactions={transactions} />

          <section className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0B111C] p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-normal text-slate-400">
              Showing page{" "}
              <span className="font-semibold text-white">
                {pagination.currentPage}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-white">
                {pagination.totalPages || 1}
              </span>{" "}
              ·{" "}
              <span className="font-semibold text-white">
                {pagination.totalTransactions || 0}
              </span>{" "}
              total transactions
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={!pagination.hasPreviousPage}
                onClick={() => goToPage(pagination.currentPage - 1)}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <button
                type="button"
                disabled={!pagination.hasNextPage}
                onClick={() => goToPage(pagination.currentPage + 1)}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default TransactionsPage;