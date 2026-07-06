import axiosInstance from "./axiosInstance";

export async function getTransactions(params = {}) {
  const response = await axiosInstance.get("/transactions", {
    params,
  });

  return response.data;
}

export async function getTransactionById(transactionId) {
  const response = await axiosInstance.get(`/transactions/${transactionId}`);
  return response.data;
}

export async function createTransaction(payload) {
  const response = await axiosInstance.post("/transactions", payload);
  return response.data;
}

export async function updateTransaction(transactionId, payload) {
  const response = await axiosInstance.patch(
    `/transactions/${transactionId}`,
    payload
  );

  return response.data;
}

export async function deleteTransaction(transactionId) {
  const response = await axiosInstance.delete(`/transactions/${transactionId}`);
  return response.data;
}

export async function bulkDeleteTransactions(transactionIds) {
  const response = await axiosInstance.delete("/transactions/bulk", {
    data: {
      transactionIds,
    },
  });

  return response.data;
}

export async function importTransactionsCsv(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post("/transactions/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function scanReceipt(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(
    "/transactions/scan-receipt",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function bulkCreateTransactions(transactions) {
  const response = await axiosInstance.post("/transactions/bulk-create", {
    transactions,
  });

  return response.data;
}