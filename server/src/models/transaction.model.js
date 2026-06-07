import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Transaction must belong to a user"],
      index: true,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
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
      enum: ["cash", "card", "upi", "bank_transfer", "wallet", "other"],
      default: "other",
    },

    receiptUrl: {
      type: String,
      default: null,
    },

    isRecurring: {
      type: Boolean,
      default: false,
    },

    recurringFrequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly", null],
      default: null,
    },

    nextRecurringDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;