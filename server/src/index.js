import "dotenv/config";

import app from "./app.js";
import connectDatabase from "./config/database.config.js";
import { startRecurringTransactionCron } from "./cron/recurring-transaction.cron.js";
import { startMonthlyReportCron } from "./cron/monthly-report.cron.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDatabase();

  startRecurringTransactionCron();
  startMonthlyReportCron();

  app.listen(PORT, () => {
    console.log(`FinSentry server is running on http://localhost:${PORT}`);
  });
};

startServer();