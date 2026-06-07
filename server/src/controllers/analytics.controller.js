import { getDashboardAnalytics } from "../services/analytics.service.js";
import asyncHandler from "../utils/async-handler.js";

export const getDashboardAnalyticsController = asyncHandler(async (req, res) => {
  const dashboard = await getDashboardAnalytics(req.user._id);

  res.status(200).json({
    success: true,
    message: "Dashboard analytics retrieved successfully.",
    data: {
      dashboard,
    },
  });
});