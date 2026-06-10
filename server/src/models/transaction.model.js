import mongoose from "mongoose";

export const TransactionTypeEnum = {
  INCOME: "income",
  EXPENSE: "expense",
};

export const PaymentMethodEnum = {
  CASH: "cash",
  CARD: "card",
  UPI: "upi",
  BANK_TRANSFER: "bank_transfer",
  WALLET: "wallet",
  OTHER: "other",
};

export const RecurringIntervalEnum = {
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
  YEARLY: "yearly",
};

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Transaction must belong to a user"],
      index: true,
    },

    title: {
      type: String,
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
      default: "",
    },

    type: {
      type: String,
      enum: Object.values(TransactionTypeEnum),
      required: [true, "Transaction type is required"],
    },

    amountInPaise: {
      type: Number,
      required: [true, "Transaction amount is required"],
      min: [1, "Amount must be greater than 0"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      maxlength: [50, "Category cannot exceed 50 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description cannot exceed 200 characters"],
      default: "",
    },

    date: {
      type: Date,
      required: [true, "Transaction date is required"],
      default: Date.now,
      index: true,
    },

    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethodEnum),
      default: PaymentMethodEnum.OTHER,
    },

    receiptUrl: {
      type: String,
      default: null,
    },

    isRecurring: {
      type: Boolean,
      default: false,
    },

    recurringInterval: {
      type: String,
      enum: [...Object.values(RecurringIntervalEnum), null],
      default: null,
    },

    nextRecurringDate: {
      type: Date,
      default: null,
    },

    recurringParent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;