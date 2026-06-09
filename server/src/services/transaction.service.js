import mongoose from "mongoose";
import Transaction from "../models/transaction.model.js";
import AppError from "../utils/app-error.js";
import { parse } from "csv-parse/sync";
import { csvTransactionRowSchema } from "../validators/csv-transaction.validator.js";

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

export const bulkDeleteTransactions = async (userId, transactionIds) => {
  const invalidIds = transactionIds.filter(
    (id) => !mongoose.Types.ObjectId.isValid(id)
  );

  if (invalidIds.length > 0) {
    throw new AppError("One or more transaction ids are invalid.", 400);
  }

  const result = await Transaction.deleteMany({
    _id: {
      $in: transactionIds,
    },
    user: userId,
  });

  return {
    requestedCount: transactionIds.length,
    deletedCount: result.deletedCount,
  };
};

export const importTransactionsFromCsv = async (userId, file) => {
  if (!file) {
    throw new AppError("CSV file is required.", 400);
  }

  const csvText = file.buffer.toString("utf-8");

  let rows;

  try {
    rows = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
    });
  } catch (error) {
    throw new AppError("Invalid CSV file format.", 400);
  }

  if (!rows.length) {
    throw new AppError("CSV file does not contain any transaction rows.", 400);
  }

  const validationErrors = [];
  const transactionsToInsert = [];

  rows.forEach((row, index) => {
    const result = csvTransactionRowSchema.safeParse(row);

    if (!result.success) {
      validationErrors.push({
        row: index + 2,
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });

      return;
    }

    const transaction = result.data;

    transactionsToInsert.push({
      user: userId,
      type: transaction.type,
      amountInPaise: convertRupeesToPaise(transaction.amount),
      category: transaction.category,
      description: transaction.description,
      date: transaction.date,
      paymentMethod: transaction.paymentMethod,
    });
  });

  if (validationErrors.length > 0) {
    const error = new AppError("CSV validation failed.", 400);
    error.errors = validationErrors;
    throw error;
  }

  const importedTransactions = await Transaction.insertMany(transactionsToInsert);

  return {
    totalRows: rows.length,
    importedCount: importedTransactions.length,
    transactions: importedTransactions.map(formatTransaction),
  };
};

export const attachReceiptToTransaction = async (
  userId,
  transactionId,
  receiptUrl
) => {
  const transaction = await findUserTransactionById(userId, transactionId);

  transaction.receiptUrl = receiptUrl;

  const updatedTransaction = await transaction.save();

  return formatTransaction(updatedTransaction);
};

export const bulkCreateTransactions = async (userId, transactions) => {
  const transactionsToInsert = transactions.map((transaction) => ({
    user: userId,
    type: transaction.type,
    amountInPaise: convertRupeesToPaise(transaction.amount),
    category: transaction.category,
    description: transaction.description,
    date: transaction.date || new Date(),
    paymentMethod: transaction.paymentMethod,
  }));

  const createdTransactions = await Transaction.insertMany(transactionsToInsert);

  return {
    requestedCount: transactions.length,
    createdCount: createdTransactions.length,
    transactions: createdTransactions.map(formatTransaction),
  };
};