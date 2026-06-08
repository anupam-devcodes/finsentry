import { z } from "zod";

const paymentMethods = [
  "cash",
  "card",
  "upi",
  "bank_transfer",
  "wallet",
  "other",
];

const normalizeLowerCaseText = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  return value.trim().toLowerCase();
};

export const csvTransactionRowSchema = z.object({
  type: z.preprocess(
    normalizeLowerCaseText,
    z.enum(["income", "expense"], {
      message: "Type must be either income or expense",
    })
  ),

  amount: z.coerce
    .number({
      message: "Amount must be a valid number",
    })
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

  date: z.coerce.date({
    message: "Enter a valid transaction date",
  }),

  paymentMethod: z
    .preprocess(
      normalizeLowerCaseText,
      z.enum(paymentMethods, {
        message: "Invalid payment method",
      })
    )
    .optional()
    .default("other"),
});