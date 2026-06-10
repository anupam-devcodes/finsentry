import { z } from "zod";

import {
  PaymentMethodEnum,
  RecurringIntervalEnum,
  TransactionTypeEnum,
} from "../models/transaction.model.js";

const transactionTypes = Object.values(TransactionTypeEnum);
const recurringIntervals = Object.values(RecurringIntervalEnum);
const paymentMethods = Object.values(PaymentMethodEnum);

const normalizeBoolean = (value) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return value.trim().toLowerCase() === "true";
  }

  return value;
};

export const transactionIdSchema = z.string().trim().min(1);

export const baseTransactionSchema = z.object({
  title: z
    .string()
    .trim()
    .max(100, "Title cannot exceed 100 characters")
    .optional(),

  description: z
    .string()
    .trim()
    .max(200, "Description cannot exceed 200 characters")
    .optional()
    .default(""),

  type: z.enum(transactionTypes, {
    errorMap: () => ({
      message: "Transaction type must either be income or expense",
    }),
  }),

  amount: z.coerce
    .number({
      message: "Amount must be a valid number",
    })
    .positive("Amount must be positive")
    .min(1, "Amount must be at least 1")
    .max(100000000, "Amount is too large"),

  category: z
    .string()
    .trim()
    .min(1, "Category is required")
    .max(50, "Category cannot exceed 50 characters"),

  date: z.coerce.date({
    message: "Enter a valid transaction date",
  }),

  paymentMethod: z
    .enum(paymentMethods, {
      errorMap: () => ({
        message: "Invalid payment method",
      }),
    })
    .optional()
    .default(PaymentMethodEnum.OTHER),

  isRecurring: z
    .preprocess(normalizeBoolean, z.boolean())
    .optional()
    .default(false),

  recurringInterval: z
    .enum(recurringIntervals, {
      errorMap: () => ({
        message: "Invalid recurring interval",
      }),
    })
    .optional()
    .nullable(),
});

export const createTransactionSchema = baseTransactionSchema.refine(
  (data) => {
    if (!data.isRecurring) {
      return true;
    }

    return Boolean(data.recurringInterval);
  },
  {
    message: "Recurring interval is required when transaction is recurring",
    path: ["recurringInterval"],
  }
);

export const updateTransactionSchema = baseTransactionSchema
  .partial()
  .refine(
    (data) => {
      if (data.isRecurring !== true) {
        return true;
      }

      return Boolean(data.recurringInterval);
    },
    {
      message: "Recurring interval is required when transaction is recurring",
      path: ["recurringInterval"],
    }
  );

export const getTransactionsQuerySchema = z.object({
  type: z.enum(transactionTypes).optional(),

  category: z.string().trim().optional(),

  paymentMethod: z.enum(paymentMethods).optional(),

  search: z.string().trim().optional(),

  startDate: z.coerce.date().optional(),

  endDate: z.coerce.date().optional(),

  page: z.coerce.number().int().min(1).optional().default(1),

  limit: z.coerce.number().int().min(1).max(100).optional().default(10),

  sortBy: z
    .enum(["date", "amount", "category", "createdAt"])
    .optional()
    .default("date"),

  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

export const bulkDeleteTransactionsSchema = z.object({
  transactionIds: z
    .array(z.string().trim().min(1, "Transaction id cannot be empty"))
    .min(1, "At least one transaction id is required"),
});

export const bulkCreateTransactionsSchema = z.object({
  transactions: z
    .array(createTransactionSchema)
    .min(1, "At least one transaction is required")
    .max(50, "Cannot create more than 50 transactions at once"),
});