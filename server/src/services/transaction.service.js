import mongoose from "mongoose";
import Transaction from "../models/transaction.model.js";
import AppError from "../utils/app-error.js";

const convertRupeesToPaise = (amount) => {
  return Math.round(amount * 100);
};

const formatTransaction = (transaction) => {
  return {
    id: transaction._id,
    type: transaction.type,
    amount: transaction.amountInPaise / 100,
    amountInPaise: transaction.amountInPaise,
    category: transaction.category,
    description: transaction.description,
    date: transaction.date,
    paymentMethod: transaction.paymentMethod,
    receiptUrl: transaction.receiptUrl,
    isRecurring: transaction.isRecurring,
    recurringFrequency: transaction.recurringFrequency,
    nextRecurringDate: transaction.nextRecurringDate,
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt,
  };
};

export const createTransaction = async (userId, transactionData) => {
  const {
    type,
    amount,
    category,
    description,
    date,
    paymentMethod,
    isRecurring,
    recurringFrequency,
    nextRecurringDate,
  } = transactionData;

  if (isRecurring && !recurringFrequency) {
    throw new AppError("Recurring frequency is required for recurring transactions.", 400);
  }

  const transaction = await Transaction.create({
    user: userId,
    type,
    amountInPaise: convertRupeesToPaise(amount),
    category,
    description,
    date,
    paymentMethod,
    isRecurring,
    recurringFrequency: isRecurring ? recurringFrequency : null,
    nextRecurringDate: isRecurring ? nextRecurringDate : null,
  });

  return formatTransaction(transaction);
};

export const getUserTransactions = async (userId, queryOptions = {}) => {
  const {
    type,
    category,
    paymentMethod,
    search,
    startDate,
    endDate,
    page,
    limit,
    sortBy,
    sortOrder,
  } = queryOptions;

  const filter = {
    user: userId,
  };

  if (type) {
    filter.type = type;
  }

  if (category) {
    filter.category = new RegExp(`^${category}$`, "i");
  }

  if (paymentMethod) {
    filter.paymentMethod = paymentMethod;
  }

  if (startDate || endDate) {
    filter.date = {};

    if (startDate) {
      filter.date.$gte = startDate;
    }

    if (endDate) {
      filter.date.$lte = endDate;
    }
  }

  if (search) {
    const searchRegex = new RegExp(search, "i");

    filter.$or = [
      { category: searchRegex },
      { description: searchRegex },
    ];
  }

  const skip = (page - 1) * limit;

  const sortField = sortBy === "amount" ? "amountInPaise" : sortBy;
  const sortDirection = sortOrder === "asc" ? 1 : -1;

  const [transactions, totalResults] = await Promise.all([
    Transaction.find(filter)
      .sort({ [sortField]: sortDirection, createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Transaction.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalResults / limit);

  return {
    transactions: transactions.map(formatTransaction),
    pagination: {
      page,
      limit,
      totalResults,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};

const validateTransactionId = (transactionId) => {
  if (!mongoose.Types.ObjectId.isValid(transactionId)) {
    throw new AppError("Invalid transaction id.", 400);
  }
};

const findUserTransactionById = async (userId, transactionId) => {
  validateTransactionId(transactionId);

  const transaction = await Transaction.findOne({
    _id: transactionId,
    user: userId,
  });

  if (!transaction) {
    throw new AppError("Transaction not found.", 404);
  }

  return transaction;
};

export const getTransactionById = async (userId, transactionId) => {
  const transaction = await findUserTransactionById(userId, transactionId);

  return formatTransaction(transaction);
};

export const updateTransaction = async (userId, transactionId, updateData) => {
  const transaction = await findUserTransactionById(userId, transactionId);

  if (
    updateData.isRecurring === true &&
    !updateData.recurringFrequency &&
    !transaction.recurringFrequency
  ) {
    throw new AppError(
      "Recurring frequency is required for recurring transactions.",
      400
    );
  }

  if (updateData.type !== undefined) transaction.type = updateData.type;
  if (updateData.amount !== undefined) {
    transaction.amountInPaise = convertRupeesToPaise(updateData.amount);
  }
  if (updateData.category !== undefined) transaction.category = updateData.category;
  if (updateData.description !== undefined) {
    transaction.description = updateData.description;
  }
  if (updateData.date !== undefined) transaction.date = updateData.date;
  if (updateData.paymentMethod !== undefined) {
    transaction.paymentMethod = updateData.paymentMethod;
  }

  if (updateData.isRecurring !== undefined) {
    transaction.isRecurring = updateData.isRecurring;

    if (updateData.isRecurring === false) {
      transaction.recurringFrequency = null;
      transaction.nextRecurringDate = null;
    }
  }

  if (updateData.recurringFrequency !== undefined) {
    transaction.recurringFrequency = updateData.recurringFrequency;
  }

  if (updateData.nextRecurringDate !== undefined) {
    transaction.nextRecurringDate = updateData.nextRecurringDate;
  }

  const updatedTransaction = await transaction.save();

  return formatTransaction(updatedTransaction);
};

export const deleteTransaction = async (userId, transactionId) => {
  const transaction = await findUserTransactionById(userId, transactionId);

  await transaction.deleteOne();

  return {
    id: transaction._id,
  };
};