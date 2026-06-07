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