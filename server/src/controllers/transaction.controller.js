import {
  bulkDeleteTransactions,
  createTransaction,
  deleteTransaction,
  getTransactionById,
  getUserTransactions,
  importTransactionsFromCsv,
  updateTransaction,
} from "../services/transaction.service.js";
import asyncHandler from "../utils/async-handler.js";

export const createTransactionController = asyncHandler(async (req, res) => {
  const transaction = await createTransaction(req.user._id, req.body);

  res.status(201).json({
    success: true,
    message: "Transaction created successfully.",
    data: {
      transaction,
    },
  });
});

export const getTransactionsController = asyncHandler(async (req, res) => {
  const result = await getUserTransactions(req.user._id, req.validatedQuery);

  res.status(200).json({
    success: true,
    message: "Transactions retrieved successfully.",
    results: result.transactions.length,
    pagination: result.pagination,
    data: {
      transactions: result.transactions,
    },
  });
});

export const getTransactionByIdController = asyncHandler(async (req, res) => {
  const transaction = await getTransactionById(req.user._id, req.params.id);

  res.status(200).json({
    success: true,
    message: "Transaction retrieved successfully.",
    data: {
      transaction,
    },
  });
});

export const updateTransactionController = asyncHandler(async (req, res) => {
  const transaction = await updateTransaction(
    req.user._id,
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Transaction updated successfully.",
    data: {
      transaction,
    },
  });
});

export const deleteTransactionController = asyncHandler(async (req, res) => {
  const result = await deleteTransaction(req.user._id, req.params.id);

  res.status(200).json({
    success: true,
    message: "Transaction deleted successfully.",
    data: result,
  });
});

export const bulkDeleteTransactionsController = asyncHandler(async (req, res) => {
  const result = await bulkDeleteTransactions(
    req.user._id,
    req.body.transactionIds
  );

  res.status(200).json({
    success: true,
    message: "Transactions deleted successfully.",
    data: result,
  });
});

export const importTransactionsController = asyncHandler(async (req, res) => {
  const result = await importTransactionsFromCsv(req.user._id, req.file);

  res.status(201).json({
    success: true,
    message: "Transactions imported successfully.",
    data: result,
  });
});