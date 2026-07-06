import axiosInstance from "./axiosInstance";

export async function generateMonthlyReport(month, year) {
  const response = await axiosInstance.post("/reports/monthly/generate", {
    month,
    year,
  });
  return response.data;
}

export async function sendMonthlyReport(month, year) {
  const response = await axiosInstance.post("/reports/monthly/send", {
    month,
    year,
  });
  return response.data;
}
