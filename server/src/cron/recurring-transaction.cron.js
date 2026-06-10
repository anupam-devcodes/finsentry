import cron from "node-cron";
import { processRecurringTransactions } from "../services/recurring-transaction.service.js";

export const startRecurringTransactionCron = () => {
  cron.schedule(
    "5 0 * * *",
    async () => {
      try {
        const result = await processRecurringTransactions();

        console.log(
          `[Recurring Cron] Checked: ${result.checkedCount}, Created: ${result.createdCount}`
        );
      } catch (error) {
        console.error("[Recurring Cron] Failed:", error.message);
      }
    },
    {
      timezone: "Asia/Kolkata",
      noOverlap: true,
    }
  );

  console.log("[Recurring Cron] Scheduled successfully.");
};