import {
  generateAndSendMonthlyReport,
  generateOrGetMonthlyReport,
} from "../services/monthly-report.service.js";
import asyncHandler from "../utils/async-handler.js";

export const generateMonthlyReportController = asyncHandler(async (req, res) => {
  const { month, year } = req.body;

  const report = await generateOrGetMonthlyReport(
    req.user._id,
    month,
    year
  );

  res.status(200).json({
    success: true,
    message: "Monthly report generated successfully.",
    data: {
      report,
    },
  });
});

export const sendMonthlyReportController = asyncHandler(async (req, res) => {
  const { month, year } = req.body;

  const result = await generateAndSendMonthlyReport(
    req.user._id,
    month,
    year
  );

  res.status(200).json({
    success: true,
    message: "Monthly report sent successfully.",
    data: result,
  });
});