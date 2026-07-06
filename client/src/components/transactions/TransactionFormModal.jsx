/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import Modal from "../common/Modal";

const defaultFormData = {
  title: "",
  description: "",
  type: "expense",
  amount: "",
  category: "",
  date: new Date().toISOString().split("T")[0],
  paymentMethod: "other",
  isRecurring: false,
  recurringInterval: "",
};

function TransactionFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isLoading = false,
}) {
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        type: initialData.type || "expense",
        amount: initialData.amount || "",
        category: initialData.category || "",
        date: initialData.date ? new Date(initialData.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        paymentMethod: initialData.paymentMethod || "other",
        isRecurring: !!initialData.isRecurring,
        recurringInterval: initialData.recurringInterval || "",
      });
    } else {
      setFormData(defaultFormData);
    }
    setErrors({});
  }, [initialData, isOpen]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name] : "" }));
    }
  }

  function validate() {
    const newErrors = {};

    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (formData.isRecurring && !formData.recurringInterval) {
      newErrors.recurringInterval = "Recurring interval is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    // Convert amount to float number
    const payload = {
      ...formData,
      amount: parseFloat(formData.amount),
      recurringInterval: formData.isRecurring ? formData.recurringInterval : null,
    };

    onSubmit(payload);
  }

  const isEdit = !!initialData;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? "Edit Transaction" : "Add Transaction"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. D-Mart Grocery, Salary"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/60"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Amount */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Amount (₹) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              name="amount"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              className={`w-full rounded-2xl border bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/60 ${
                errors.amount ? "border-red-500/50" : "border-white/10"
              }`}
            />
            {errors.amount && (
              <p className="mt-1 text-xs text-red-400">{errors.amount}</p>
            )}
          </div>

          {/* Type */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Type <span className="text-red-400">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-[#0B111C] px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/60"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Category */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Category <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Food, Salary, Rent"
              className={`w-full rounded-2xl border bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/60 ${
                errors.category ? "border-red-500/50" : "border-white/10"
              }`}
            />
            {errors.category && (
              <p className="mt-1 text-xs text-red-400">{errors.category}</p>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-[#0B111C] px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/60"
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="upi">UPI</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="wallet">Wallet</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Date */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full rounded-2xl border bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/60 ${
                errors.date ? "border-red-500/50" : "border-white/10"
              }`}
            />
            {errors.date && (
              <p className="mt-1 text-xs text-red-400">{errors.date}</p>
            )}
          </div>

          {/* Recurring Option */}
          <div className="flex items-center pt-8">
            <label className="flex items-center gap-3 cursor-pointer text-sm text-slate-300">
              <input
                type="checkbox"
                name="isRecurring"
                checked={formData.isRecurring}
                onChange={handleChange}
                className="h-5 w-5 rounded border-white/10 bg-white/[0.04] text-emerald-400 focus:ring-0 focus:ring-offset-0"
              />
              Is Recurring Transaction
            </label>
          </div>
        </div>

        {/* Recurring Interval */}
        {formData.isRecurring && (
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Recurring Interval <span className="text-red-400">*</span>
            </label>
            <select
              name="recurringInterval"
              value={formData.recurringInterval}
              onChange={handleChange}
              className={`w-full rounded-2xl border bg-[#0B111C] px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/60 ${
                errors.recurringInterval ? "border-red-500/50" : "border-white/10"
              }`}
            >
              <option value="">Select interval...</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            {errors.recurringInterval && (
              <p className="mt-1 text-xs text-red-400">{errors.recurringInterval}</p>
            )}
          </div>
        )}

        {/* Description */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Transaction description..."
            rows="3"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/60 resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08] disabled:opacity-40"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-[#06100B] transition hover:bg-emerald-300 disabled:opacity-40"
          >
            {isLoading ? "Saving..." : isEdit ? "Update Transaction" : "Create Transaction"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default TransactionFormModal;
