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

export const getUserTransactions = async (userId) => {
  const transactions = await Transaction.find({ user: userId }).sort({
    date: -1,
    createdAt: -1,
  });

  return transactions.map(formatTransaction);
};