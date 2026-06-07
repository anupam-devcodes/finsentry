import {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  getUserTransactions,
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
  const transactions = await getUserTransactions(req.user._id);

  res.status(200).json({
    success: true,
    message: "Transactions retrieved successfully.",
    results: transactions.length,
    data: {
      transactions,
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