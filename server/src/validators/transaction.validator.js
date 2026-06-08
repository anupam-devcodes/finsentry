import { z } from "zod";

const paymentMethods = [
  "cash",
  "card",
  "upi",
  "bank_transfer",
  "wallet",
  "other",
];

const recurringFrequencies = [
  "daily",
  "weekly",
  "monthly",
  "yearly",
];

export const createTransactionSchema = z.object({
  type: z.enum(["income", "expense"], {
    message: "Transaction type must be either income or expense",
  }),

  amount: z.coerce
    .number()
    .positive("Amount must be greater than 0")
    .max(100000000, "Amount is too large"),

  category: z
    .string()
    .trim()
    .min(1, "Category is required")
    .max(50, "Category cannot exceed 50 characters"),

  description: z
    .string()
    .trim()
    .max(200, "Description cannot exceed 200 characters")
    .optional()
    .default(""),

  date: z.coerce
    .date({
      message: "Enter a valid transaction date",
    })
    .optional(),

  paymentMethod: z
    .enum(paymentMethods, {
      message: "Invalid payment method",
    })
    .optional()
    .default("other"),

  isRecurring: z
    .boolean()
    .optional()
    .default(false),

  recurringFrequency: z
    .enum(recurringFrequencies, {
      message: "Invalid recurring frequency",
    })
    .optional()
    .nullable(),

  nextRecurringDate: z.coerce
    .date({
      message: "Enter a valid next recurring date",
    })
    .optional()
    .nullable(),
});

export const updateTransactionSchema = z
  .object({
    type: z
      .enum(["income", "expense"], {
        message: "Transaction type must be either income or expense",
      })
      .optional(),

    amount: z.coerce
      .number()
      .positive("Amount must be greater than 0")
      .max(100000000, "Amount is too large")
      .optional(),

    category: z
      .string()
      .trim()
      .min(1, "Category is required")
      .max(50, "Category cannot exceed 50 characters")
      .optional(),

    description: z
      .string()
      .trim()
      .max(200, "Description cannot exceed 200 characters")
      .optional(),

    date: z.coerce
      .date({
        message: "Enter a valid transaction date",
      })
      .optional(),

    paymentMethod: z
      .enum(paymentMethods, {
        message: "Invalid payment method",
      })
      .optional(),

    isRecurring: z.boolean().optional(),

    recurringFrequency: z
      .enum(recurringFrequencies, {
        message: "Invalid recurring frequency",
      })
      .optional()
      .nullable(),

    nextRecurringDate: z.coerce
      .date({
        message: "Enter a valid next recurring date",
      })
      .optional()
      .nullable(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update the transaction",
  });   

  export const getTransactionsQuerySchema = z.object({
  type: z
    .enum(["income", "expense"], {
      message: "Transaction type must be either income or expense",
    })
    .optional(),

  category: z
    .string()
    .trim()
    .min(1, "Category cannot be empty")
    .optional(),

  paymentMethod: z
    .enum(paymentMethods, {
      message: "Invalid payment method",
    })
    .optional(),

  search: z
    .string()
    .trim()
    .min(1, "Search cannot be empty")
    .optional(),

  startDate: z.coerce
    .date({
      message: "Enter a valid start date",
    })
    .optional(),

  endDate: z.coerce
    .date({
      message: "Enter a valid end date",
    })
    .optional(),

  page: z.coerce
    .number()
    .int("Page must be a whole number")
    .min(1, "Page must be at least 1")
    .optional()
    .default(1),

  limit: z.coerce
    .number()
    .int("Limit must be a whole number")
    .min(1, "Limit must be at least 1")
    .max(100, "Limit cannot exceed 100")
    .optional()
    .default(10),

  sortBy: z
    .enum(["date", "amount", "createdAt"], {
      message: "Invalid sort field",
    })
    .optional()
    .default("date"),

  sortOrder: z
    .enum(["asc", "desc"], {
      message: "Sort order must be asc or desc",
    })
    .optional()
    .default("desc"),
});

export const bulkDeleteTransactionsSchema = z.object({
  transactionIds: z
    .array(z.string().min(1, "Transaction id cannot be empty"))
    .min(1, "At least one transaction id is required"),
});