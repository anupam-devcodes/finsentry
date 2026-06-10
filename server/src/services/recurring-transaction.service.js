import Transaction, {
  RecurringIntervalEnum,
} from "../models/transaction.model.js";

const MAX_OCCURRENCES_PER_TRANSACTION = 24;

const getLastDayOfMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const addMonthsSafely = (date, monthsToAdd) => {
  const newDate = new Date(date);

  const originalDay = newDate.getDate();

  newDate.setDate(1);
  newDate.setMonth(newDate.getMonth() + monthsToAdd);

  const lastDayOfTargetMonth = getLastDayOfMonth(
    newDate.getFullYear(),
    newDate.getMonth()
  );

  newDate.setDate(Math.min(originalDay, lastDayOfTargetMonth));

  return newDate;
};

export const calculateNextRecurringDate = (currentDate, recurringInterval) => {
  const nextDate = new Date(currentDate);

  switch (recurringInterval) {
    case RecurringIntervalEnum.DAILY:
      nextDate.setDate(nextDate.getDate() + 1);
      return nextDate;

    case RecurringIntervalEnum.WEEKLY:
      nextDate.setDate(nextDate.getDate() + 7);
      return nextDate;

    case RecurringIntervalEnum.MONTHLY:
      return addMonthsSafely(nextDate, 1);

    case RecurringIntervalEnum.YEARLY:
      return addMonthsSafely(nextDate, 12);

    default:
      return null;
  }
};

const createTransactionCopy = (transaction, occurrenceDate) => {
  return {
    user: transaction.user,
    type: transaction.type,
    amountInPaise: transaction.amountInPaise,
    category: transaction.category,
    description: transaction.description,
    date: occurrenceDate,
    paymentMethod: transaction.paymentMethod,
    receiptUrl: transaction.receiptUrl || null,

    isRecurring: false,
    recurringInterval: null,
    nextRecurringDate: null,
    recurringParent: transaction._id,
  };
};

export const processRecurringTransactions = async () => {
  const now = new Date();

  const recurringTransactions = await Transaction.find({
    isRecurring: true,
    recurringInterval: { $ne: null },
    nextRecurringDate: { $lte: now },
  });

  const transactionsToCreate = [];
  const updateOperations = [];

  for (const transaction of recurringTransactions) {
    let occurrenceDate = new Date(transaction.nextRecurringDate);
    let occurrenceCount = 0;

    while (
      occurrenceDate <= now &&
      occurrenceCount < MAX_OCCURRENCES_PER_TRANSACTION
    ) {
      transactionsToCreate.push(
        createTransactionCopy(transaction, occurrenceDate)
      );

      occurrenceDate = calculateNextRecurringDate(
        occurrenceDate,
        transaction.recurringInterval
      );

      occurrenceCount += 1;

      if (!occurrenceDate) {
        break;
      }
    }

    if (occurrenceDate) {
      updateOperations.push({
        updateOne: {
          filter: { _id: transaction._id },
          update: { $set: { nextRecurringDate: occurrenceDate } },
        },
      });
    }
  }

  let createdTransactions = [];

  if (transactionsToCreate.length > 0) {
    createdTransactions = await Transaction.insertMany(transactionsToCreate);
  }

  if (updateOperations.length > 0) {
    await Transaction.bulkWrite(updateOperations);
  }

  return {
    checkedCount: recurringTransactions.length,
    createdCount: createdTransactions.length,
  };
};