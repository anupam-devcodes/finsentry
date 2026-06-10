import cron from "node-cron";

import User from "../models/user.model.js";
import { generateAndSendMonthlyReport } from "../services/monthly-report.service.js";

const getPreviousMonthAndYear = () => {
  const now = new Date();

  const previousMonthDate = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  );

  return {
    month: previousMonthDate.getMonth() + 1,
    year: previousMonthDate.getFullYear(),
  };
};

const processMonthlyReports = async () => {
  const { month, year } = getPreviousMonthAndYear();

  const users = await User.find({}).select("_id email name");

  let sentCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const user of users) {
    try {
      const result = await generateAndSendMonthlyReport(
        user._id,
        month,
        year
      );

      if (result.email?.skipped) {
        skippedCount += 1;
      } else {
        sentCount += 1;
      }
    } catch (error) {
      failedCount += 1;

      console.error(
        `[Monthly Report Cron] Failed for user ${user._id}: ${error.message}`
      );
    }
  }

  return {
    month,
    year,
    totalUsers: users.length,
    sentCount,
    skippedCount,
    failedCount,
  };
};

export const startMonthlyReportCron = () => {
  cron.schedule(
    "0 8 1 * *",
    async () => {
      try {
        const result = await processMonthlyReports();

        console.log(
          `[Monthly Report Cron] ${result.month}/${result.year} | Users: ${result.totalUsers}, Sent: ${result.sentCount}, Skipped: ${result.skippedCount}, Failed: ${result.failedCount}`
        );
      } catch (error) {
        console.error("[Monthly Report Cron] Failed:", error.message);
      }
    },
    {
      timezone: "Asia/Kolkata",
      noOverlap: true,
    }
  );

  console.log("[Monthly Report Cron] Scheduled successfully.");
};  