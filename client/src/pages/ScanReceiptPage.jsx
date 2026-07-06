import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { scanReceipt, bulkCreateTransactions } from "../api/transactionApi";

import PageHeader from "../components/common/PageHeader";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import ReceiptUploadBox from "../components/receipts/ReceiptUploadBox";
import ReceiptSummaryCard from "../components/receipts/ReceiptSummaryCard";
import ExtractedTransactionTable from "../components/receipts/ExtractedTransactionTable";

function ScanReceiptPage() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState("");

  const [receiptSummary, setReceiptSummary] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  function handleFileSelect(selectedFile) {
    setFile(selectedFile);
    setError("");
    // Reset previous scan data when a new file is uploaded
    setReceiptSummary("");
    setDrafts([]);
    setSelectedIndices([]);
  }

  function handleClear() {
    setFile(null);
    setReceiptSummary("");
    setDrafts([]);
    setSelectedIndices([]);
    setError("");
  }

  async function handleScan() {
    if (!file) return;

    setIsScanning(true);
    setError("");

    try {
      const response = await scanReceipt(file);

      const summary = response?.data?.receiptSummary || "";
      const extracted = response?.data?.extractedTransactions || [];

      // Map backend extracted fields to front-end draft format
      const formattedDrafts = extracted.map((item) => ({
        title: item.merchant || item.description || `${item.category || "Receipt"} Expense`,
        description: item.description || "",
        type: item.type || "expense",
        amount: item.amount || "",
        category: item.category || "Other",
        date: item.date || new Date().toISOString().split("T")[0],
        paymentMethod: item.paymentMethod || "other",
      }));

      setReceiptSummary(summary);
      setDrafts(formattedDrafts);
      // Select all by default
      setSelectedIndices(formattedDrafts.map((_, i) => i));

      toast.success("Receipt scanned successfully!");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Receipt scan failed. Please try again.";
      setError(message);
      toast.error("Scan failed");
    } finally {
      setIsScanning(false);
    }
  }

  function handleDraftChange(index, field, value) {
    setDrafts((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        [field]: value,
      };
      return copy;
    });
  }

  function handleSelectionToggle(index) {
    setSelectedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }

  function handleSelectAllToggle() {
    if (selectedIndices.length === drafts.length) {
      setSelectedIndices([]);
    } else {
      setSelectedIndices(drafts.map((_, i) => i));
    }
  }

  async function handleSave() {
    if (selectedIndices.length === 0) {
      toast.error("Please select at least one transaction to save.");
      return;
    }

    // Filter only selected drafts and perform validation
    const selectedDrafts = drafts.filter((_, idx) => selectedIndices.includes(idx));

    for (const draft of selectedDrafts) {
      if (!draft.title.trim()) {
        toast.error("Title cannot be empty.");
        return;
      }
      if (draft.amount === "" || Number(draft.amount) <= 0) {
        toast.error("Amount must be a positive number.");
        return;
      }
      if (!draft.category.trim()) {
        toast.error("Category cannot be empty.");
        return;
      }
      if (!draft.date) {
        toast.error("Date is required.");
        return;
      }
    }

    setIsSaving(true);
    try {
      // Map to API structure (amount is parsed to standard numbers, type enums are lowercase)
      const transactionsPayload = selectedDrafts.map((item) => ({
        title: item.title.trim(),
        description: item.description.trim(),
        type: item.type.toLowerCase(),
        amount: parseFloat(item.amount),
        category: item.category.trim(),
        date: item.date,
        paymentMethod: item.paymentMethod.toLowerCase(),
      }));

      await bulkCreateTransactions(transactionsPayload);
      toast.success("Transactions saved to ledger!");
      navigate("/transactions");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to save transactions. Please review details.";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Intelligence"
        title="AI Receipt Scanner"
        description="Upload a photo or scanned copy of a receipt. Our AI engine will analyze items, separate them category-wise, and draft ledger transactions for review."
      />

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        {/* Left Column: Upload */}
        <div className="space-y-4">
          <ReceiptUploadBox
            onFileSelect={handleFileSelect}
            file={file}
            onClear={handleClear}
          />

          {file && !isScanning && drafts.length === 0 && (
            <button
              type="button"
              onClick={handleScan}
              className="w-full rounded-2xl bg-emerald-400 py-3.5 text-sm font-semibold text-[#06100B] transition hover:bg-emerald-300 shadow-lg"
            >
              Analyze Receipt ⚡
            </button>
          )}
        </div>

        {/* Right Column: Scan status & Review */}
        <div className="space-y-6">
          {/* Default state */}
          {!isScanning && !error && drafts.length === 0 && (
            <div className="grid min-h-[300px] place-items-center rounded-3xl border border-dashed border-white/10 bg-white/[0.01] p-8 text-center">
              <div>
                <p className="text-sm font-semibold text-white">No receipt scanned</p>
                <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500">
                  Select a receipt image on the left, then click &apos;Analyze Receipt&apos; to extract transactions.
                </p>
              </div>
            </div>
          )}

          {/* Scanning Progress */}
          {isScanning && (
            <div className="py-12">
              <LoadingState message="FinSentry AI is extracting category-wise expenses..." />
            </div>
          )}

          {/* Scanning Error */}
          {!isScanning && error && (
            <ErrorState
              title="Scanner Extraction Failed"
              message={error}
              onRetry={handleScan}
            />
          )}

          {/* Scanning Results */}
          {!isScanning && drafts.length > 0 && (
            <div className="space-y-6">
              <ReceiptSummaryCard summary={receiptSummary} />

              <ExtractedTransactionTable
                drafts={drafts}
                selectedIndices={selectedIndices}
                onSelectionToggle={handleSelectionToggle}
                onSelectAllToggle={handleSelectAllToggle}
                onDraftChange={handleDraftChange}
              />

              {/* Action Bar */}
              <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0B111C] p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-400">
                  Selected <span className="font-bold text-white">{selectedIndices.length}</span> of{" "}
                  <span className="font-bold text-white">{drafts.length}</span> draft items to save.
                </p>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleClear}
                    disabled={isSaving}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-white/[0.08]"
                  >
                    Discard
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="rounded-xl bg-emerald-400 px-5 py-2.5 text-xs font-semibold text-[#06100B] transition hover:bg-emerald-300 disabled:opacity-40"
                  >
                    {isSaving ? "Saving..." : "Save Approved Transactions"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScanReceiptPage;