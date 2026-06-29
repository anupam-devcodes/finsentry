import axiosInstance from "./axiosInstance";

export async function getDashboardAnalytics() {
  const response = await axiosInstance.get("/analytics/dashboard");
  return response.data;
}