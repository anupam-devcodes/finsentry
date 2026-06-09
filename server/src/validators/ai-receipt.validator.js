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

const emptyStringIfMissing = (value) => {
  if (value === null || value === undefined) {
    return "";
  }

  return value;
};

const aiReceiptTransactionSchema = z.object({
  type: z
    .preprocess(normalizeLowerCaseText, z.enum(["expense"]))
    .optional()
    .default("expense"),

  amount: z.coerce
    .number({
      message: "AI extracted amount must be a valid number",
    })
    .positive("AI extracted amount must be greater than 0")
    .max(100000000, "AI extracted amount is too large"),

  category: z
    .string()
    .trim()
    .min(1, "AI extracted category is required")
    .max(50, "AI extracted category cannot exceed 50 characters")
    .default("Other"),

  description: z
    .preprocess(
      emptyStringIfMissing,
      z.string().trim().max(200, "AI extracted description cannot exceed 200 characters")
    )
    .default("Receipt expense"),

  date: z.coerce.date({
    message: "AI extracted date must be valid",
  }),

  paymentMethod: z
    .preprocess(
      normalizeLowerCaseText,
      z.enum(paymentMethods, {
        message: "AI extracted payment method is invalid",
      })
    )
    .optional()
    .default("other"),

  merchant: z
    .preprocess(emptyStringIfMissing, z.string().trim().max(100))
    .optional()
    .default(""),

  confidence: z.coerce.number().min(0).max(1).optional().default(0.7),
});

export const aiReceiptExtractionSchema = z.object({
  transactions: z
    .array(aiReceiptTransactionSchema)
    .min(1, "At least one transaction must be extracted")
    .max(10, "Too many transactions extracted from one receipt"),

  receiptSummary: z
    .preprocess(emptyStringIfMissing, z.string().trim().max(300))
    .optional()
    .default(""),
});