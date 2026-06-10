import { z } from "zod";

const currentYear = new Date().getFullYear();

export const monthlyReportRequestSchema = z.object({
  month: z.coerce
    .number({
      message: "Month must be a valid number",
    })
    .int("Month must be a whole number")
    .min(1, "Month must be between 1 and 12")
    .max(12, "Month must be between 1 and 12"),

  year: z.coerce
    .number({
      message: "Year must be a valid number",
    })
    .int("Year must be a whole number")
    .min(2000, "Year must be 2000 or later")
    .max(currentYear + 1, "Year is too far in the future"),
});