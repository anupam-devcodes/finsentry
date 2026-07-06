/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  bulkDeleteTransactions,
} from "../api/transactionApi";

import PageHeader from "../components/common/PageHeader";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionFormModal from "../components/transactions/TransactionFormModal";
import ConfirmDialog from "../components/common/ConfirmDialog";

const defaultFilters = {
  search: "",
  type: "",
  category: "",
  paymentMethod: "",
  startDate: "",
  endDate: "",
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

  // Checkbox row selections
  const [selectedIds, setSelectedIds] = useState([]);

  // Modal / Drawer States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  // Single Delete Confirmation
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Bulk Delete Confirmation
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Row selection handlers
  function handleSelectToggle(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function handleSelectAllToggle() {
    const pageIds = transactions.map((t) => t.id || t._id);
    const allPageIdsSelected = pageIds.every((id) => selectedIds.includes(id));

    if (allPageIdsSelected) {
      // Unselect all transactions on the current page
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      // Add all transactions on the current page that aren't already selected
      setSelectedIds((prev) => {
        const uniqueNewIds = pageIds.filter((id) => !prev.includes(id));
        return [...prev, ...uniqueNewIds];
      });
    }
  }

  // Add/Edit Modals handlers
  function handleOpenAddModal() {
    setEditingTransaction(null);
    setIsFormModalOpen(true);
  }

  function handleOpenEditModal(transaction) {
    setEditingTransaction(transaction);
    setIsFormModalOpen(true);
  }

  async function handleFormSubmit(payload) {
    setIsFormSubmitting(true);
    try {
      if (editingTransaction) {
        // Edit Mode
        const id = editingTransaction.id || editingTransaction._id;
        await updateTransaction(id, payload);
        toast.success("Transaction updated successfully!");
      } else {
        // Add Mode
        await createTransaction(payload);
        toast.success("Transaction created successfully!");
      }
      setIsFormModalOpen(false);
      fetchTransactions();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to save transaction.";
      toast.error(message);
    } finally {
      setIsFormSubmitting(false);
    }
  }

  // Delete Action Handlers
  function handleOpenDeleteConfirm(id) {
    setDeletingId(id);
    setIsDeleteOpen(true);
  }

  async function handleConfirmDelete() {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await deleteTransaction(deletingId);
      toast.success("Transaction deleted successfully!");
      setIsDeleteOpen(false);
      setDeletingId(null);
      // Remove from selected list if deleted
      setSelectedIds((prev) => prev.filter((id) => id !== deletingId));
      fetchTransactions();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete transaction.";
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  }

  // Bulk Delete Action Handlers
  async function handleConfirmBulkDelete() {
    if (selectedIds.length === 0) return;
    setIsBulkDeleting(true);
    try {
      const result = await bulkDeleteTransactions(selectedIds);
      toast.success(`Successfully deleted ${result.data?.deletedCount || selectedIds.length} transactions.`);
      setIsBulkDeleteOpen(false);
      setSelectedIds([]);
      fetchTransactions();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete selected transactions.";
      toast.error(message);
    } finally {
      setIsBulkDeleting(false);
    }
  }

  const hasTransactions = transactions.length > 0;
  const hasSelection = selectedIds.length > 0;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Ledger"
        title="Transactions"
        description="Review your income, expenses, categories, payment methods, and transaction history."
        action={
          <div className="flex items-center gap-3">
            {hasSelection && (
              <button
                type="button"
                onClick={() => setIsBulkDeleteOpen(true)}
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
              >
                Delete Selected ({selectedIds.length})
              </button>
            )}

            <button
              type="button"
              onClick={handleOpenAddModal}
              className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold leading-normal text-[#06100B] transition hover:bg-emerald-300"
            >
              + Add Transaction
            </button>
          </div>
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
              onClick={handleOpenAddModal}
              className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-[#06100B] transition hover:bg-emerald-300"
            >
              + Add Transaction
            </button>
          }
        />
      )}

      {!isLoading && !errorMessage && hasTransactions && (
        <>
          <TransactionTable
            transactions={transactions}
            selectedIds={selectedIds}
            onSelectToggle={handleSelectToggle}
            onSelectAllToggle={handleSelectAllToggle}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteConfirm}
          />

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

      {/* Add / Edit Modal */}
      <TransactionFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingTransaction}
        isLoading={isFormSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Transaction"
        message="Are you sure you want to delete this transaction? This will permanently remove it from your ledger."
        confirmText="Delete"
        confirmTone="danger"
        isLoading={isDeleting}
      />

      {/* Bulk Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={isBulkDeleteOpen}
        onClose={() => setIsBulkDeleteOpen(false)}
        onConfirm={handleConfirmBulkDelete}
        title="Delete Selected Transactions"
        message={`Are you sure you want to delete the ${selectedIds.length} selected transactions? This will permanently remove them from your ledger.`}
        confirmText="Delete All"
        confirmTone="danger"
        isLoading={isBulkDeleting}
      />
    </div>
  );
}

export default TransactionsPage;