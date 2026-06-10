import mongoose from "mongoose";
import { parse } from "csv-parse/sync";

import Transaction from "../models/transaction.model.js";
import AppError from "../utils/app-error.js";
import { csvTransactionRowSchema } from "../validators/csv-transaction.validator.js";
import { calculateNextRecurringDate } from "./recurring-transaction.service.js";

const convertRupeesToPaise = (amount) => {
  return Math.round(Number(amount) * 100);
};

const convertPaiseToRupees = (amountInPaise) => {
  return amountInPaise / 100;
};

const escapeRegExp = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const formatTransaction = (transaction) => {
  return {
    id: transaction._id,
    user: transaction.user,
    title: transaction.title,
    description: transaction.description,
    type: transaction.type,
    amount: convertPaiseToRupees(transaction.amountInPaise),
    amountInPaise: transaction.amountInPaise,
    category: transaction.category,
    date: transaction.date,
    paymentMethod: transaction.paymentMethod,
    receiptUrl: transaction.receiptUrl,

    isRecurring: transaction.isRecurring,
    recurringInterval: transaction.recurringInterval,
    nextRecurringDate: transaction.nextRecurringDate,
    recurringParent: transaction.recurringParent,

    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt,
  };
};

const buildTransactionTitle = (transactionData) => {
  return (
    transactionData.title ||
    transactionData.description ||
    `${transactionData.category} transaction`
  );
};

const getRecurringFields = (transactionData) => {
  if (!transactionData.isRecurring) {
    return {
      isRecurring: false,
      recurringInterval: null,
      nextRecurringDate: null,
    };
  }

  const nextRecurringDate = calculateNextRecurringDate(
    transactionData.date,
    transactionData.recurringInterval
  );

  if (!nextRecurringDate) {
    throw new AppError("Invalid recurring interval.", 400);
  }

  return {
    isRecurring: true,
    recurringInterval: transactionData.recurringInterval,
    nextRecurringDate,
  };
};

export const createTransaction = async (userId, transactionData) => {
  const recurringFields = getRecurringFields(transactionData);

  const transaction = await Transaction.create({
    user: userId,
    title: buildTransactionTitle(transactionData),
    description: transactionData.description,
    type: transactionData.type,
    amountInPaise: convertRupeesToPaise(transactionData.amount),
    category: transactionData.category,
    date: transactionData.date,
    paymentMethod: transactionData.paymentMethod,

    ...recurringFields,

    recurringParent: null,
  });

  return formatTransaction(transaction);
};

export const getUserTransactions = async (userId, filters) => {
  const {
    type,
    category,
    paymentMethod,
    search,
    startDate,
    endDate,
    page = 1,
    limit = 10,
    sortBy = "date",
    sortOrder = "desc",
  } = filters;

  const query = {
    user: userId,
  };

  if (type) {
    query.type = type;
  }

  if (category) {
    query.category = new RegExp(`^${escapeRegExp(category)}$`, "i");
  }

  if (paymentMethod) {
    query.paymentMethod = paymentMethod;
  }

  if (startDate || endDate) {
    query.date = {};

    if (startDate) {
      query.date.$gte = startDate;
    }

    if (endDate) {
      query.date.$lte = endDate;
    }
  }

  if (search) {
    const searchRegex = new RegExp(escapeRegExp(search), "i");

    query.$or = [
      { title: searchRegex },
      { description: searchRegex },
      { category: searchRegex },
    ];
  }

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const sortFieldMap = {
    date: "date",
    amount: "amountInPaise",
    category: "category",
    createdAt: "createdAt",
  };

  const sortField = sortFieldMap[sortBy] || "date";
  const sortDirection = sortOrder === "asc" ? 1 : -1;

  const [transactions, totalTransactions] = await Promise.all([
    Transaction.find(query)
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(limitNumber),

    Transaction.countDocuments(query),
  ]);

  const totalPages = Math.ceil(totalTransactions / limitNumber);

  return {
    transactions: transactions.map(formatTransaction),
    pagination: {
      totalTransactions,
      totalPages,
      currentPage: pageNumber,
      limit: limitNumber,
      hasNextPage: pageNumber < totalPages,
      hasPreviousPage: pageNumber > 1,
    },
  };
};

export const findUserTransactionById = async (userId, transactionId) => {
  if (!mongoose.Types.ObjectId.isValid(transactionId)) {
    throw new AppError("Invalid transaction id.", 400);
  }

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

export const updateTransaction = async (
  userId,
  transactionId,
  transactionData
) => {
  const transaction = await findUserTransactionById(userId, transactionId);

  if (transactionData.title !== undefined) {
    transaction.title = transactionData.title || buildTransactionTitle({
      ...transaction.toObject(),
      ...transactionData,
    });
  }

  if (transactionData.description !== undefined) {
    transaction.description = transactionData.description;
  }

  if (transactionData.type !== undefined) {
    transaction.type = transactionData.type;
  }

  if (transactionData.amount !== undefined) {
    transaction.amountInPaise = convertRupeesToPaise(transactionData.amount);
  }

  if (transactionData.category !== undefined) {
    transaction.category = transactionData.category;
  }

  if (transactionData.date !== undefined) {
    transaction.date = transactionData.date;
  }

  if (transactionData.paymentMethod !== undefined) {
    transaction.paymentMethod = transactionData.paymentMethod;
  }

  const recurringFieldsTouched =
    transactionData.isRecurring !== undefined ||
    transactionData.recurringInterval !== undefined ||
    transactionData.date !== undefined;

  if (recurringFieldsTouched) {
    const finalIsRecurring =
      transactionData.isRecurring !== undefined
        ? transactionData.isRecurring
        : transaction.isRecurring;

    if (!finalIsRecurring) {
      transaction.isRecurring = false;
      transaction.recurringInterval = null;
      transaction.nextRecurringDate = null;
    } else {
      const finalRecurringInterval =
        transactionData.recurringInterval || transaction.recurringInterval;

      if (!finalRecurringInterval) {
        throw new AppError(
          "Recurring interval is required when transaction is recurring.",
          400
        );
      }

      const baseDate = transaction.date;

      const nextRecurringDate = calculateNextRecurringDate(
        baseDate,
        finalRecurringInterval
      );

      if (!nextRecurringDate) {
        throw new AppError("Invalid recurring interval.", 400);
      }

      transaction.isRecurring = true;
      transaction.recurringInterval = finalRecurringInterval;
      transaction.nextRecurringDate = nextRecurringDate;
    }
  }

  const updatedTransaction = await transaction.save();

  return formatTransaction(updatedTransaction);
};

export const deleteTransaction = async (userId, transactionId) => {
  const transaction = await findUserTransactionById(userId, transactionId);

  await transaction.deleteOne();

  return {
    deletedTransactionId: transactionId,
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
    _id: { $in: transactionIds },
    user: userId,
  });

  return {
    requestedCount: transactionIds.length,
    deletedCount: result.deletedCount,
  };
};

export const bulkCreateTransactions = async (userId, transactions) => {
  const transactionsToInsert = transactions.map((transaction) => {
    const recurringFields = getRecurringFields(transaction);

    return {
      user: userId,
      title: buildTransactionTitle(transaction),
      description: transaction.description,
      type: transaction.type,
      amountInPaise: convertRupeesToPaise(transaction.amount),
      category: transaction.category,
      date: transaction.date,
      paymentMethod: transaction.paymentMethod,

      ...recurringFields,

      recurringParent: null,
    };
  });

  const createdTransactions = await Transaction.insertMany(transactionsToInsert);

  return {
    requestedCount: transactions.length,
    createdCount: createdTransactions.length,
    transactions: createdTransactions.map(formatTransaction),
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
    throw new AppError(
      "CSV file does not contain any transaction rows.",
      400
    );
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
      title:
        transaction.title ||
        transaction.description ||
        `${transaction.category} transaction`,
      description: transaction.description,
      type: transaction.type,
      amountInPaise: convertRupeesToPaise(transaction.amount),
      category: transaction.category,
      date: transaction.date,
      paymentMethod: transaction.paymentMethod,

      isRecurring: false,
      recurringInterval: null,
      nextRecurringDate: null,
      recurringParent: null,
    });
  });

  if (validationErrors.length > 0) {
    const error = new AppError("CSV validation failed.", 400);
    error.errors = validationErrors;
    throw error;
  }

  const importedTransactions = await Transaction.insertMany(
    transactionsToInsert
  );

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