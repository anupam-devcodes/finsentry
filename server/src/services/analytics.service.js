import Transaction from "../models/transaction.model.js";

const convertPaiseToRupees = (amountInPaise) => {
  return amountInPaise / 100;
};

const formatTransaction = (transaction) => {
  return {
    id: transaction._id,
    type: transaction.type,
    amount: convertPaiseToRupees(transaction.amountInPaise),
    amountInPaise: transaction.amountInPaise,
    category: transaction.category,
    description: transaction.description,
    date: transaction.date,
    paymentMethod: transaction.paymentMethod,
    createdAt: transaction.createdAt,
  };
};

export const getDashboardAnalytics = async (userId) => {
  // 1. Total income, total expense, and count by transaction type
  const summaryByType = await Transaction.aggregate([
    {
      $match: {
        user: userId,
      },
    },
    {
      $group: {
        _id: "$type",
        totalAmountInPaise: {
          $sum: "$amountInPaise",
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  const incomeSummary = summaryByType.find((item) => item._id === "income");
  const expenseSummary = summaryByType.find((item) => item._id === "expense");

  const totalIncomeInPaise = incomeSummary?.totalAmountInPaise || 0;
  const totalExpenseInPaise = expenseSummary?.totalAmountInPaise || 0;
  const balanceInPaise = totalIncomeInPaise - totalExpenseInPaise;

  // 2. Expense breakdown by category
  const expenseByCategory = await Transaction.aggregate([
    {
      $match: {
        user: userId,
        type: "expense",
      },
    },
    {
      $group: {
        _id: "$category",
        totalAmountInPaise: {
          $sum: "$amountInPaise",
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        totalAmountInPaise: -1,
      },
    },
  ]);

  // 3. Latest 5 transactions
  const recentTransactions = await Transaction.find({
    user: userId,
  })
    .sort({
      date: -1,
      createdAt: -1,
    })
    .limit(5);

  // 4. Monthly income vs expense trend
  const monthlyTrendData = await Transaction.aggregate([
    {
      $match: {
        user: userId,
      },
    },
    {
      $group: {
        _id: {
          month: {
            $dateToString: {
              format: "%Y-%m",
              date: "$date",
            },
          },
          type: "$type",
        },
        totalAmountInPaise: {
          $sum: "$amountInPaise",
        },
      },
    },
    {
      $group: {
        _id: "$_id.month",
        totals: {
          $push: {
            type: "$_id.type",
            totalAmountInPaise: "$totalAmountInPaise",
          },
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  return {
    summary: {
      totalIncome: convertPaiseToRupees(totalIncomeInPaise),
      totalIncomeInPaise,
      totalExpense: convertPaiseToRupees(totalExpenseInPaise),
      totalExpenseInPaise,
      balance: convertPaiseToRupees(balanceInPaise),
      balanceInPaise,
      incomeTransactionCount: incomeSummary?.count || 0,
      expenseTransactionCount: expenseSummary?.count || 0,
    },

    expenseByCategory: expenseByCategory.map((category) => ({
      category: category._id,
      totalAmount: convertPaiseToRupees(category.totalAmountInPaise),
      totalAmountInPaise: category.totalAmountInPaise,
      count: category.count,
    })),

    monthlyTrend: monthlyTrendData.map((monthData) => {
      const income = monthData.totals.find((item) => item.type === "income");
      const expense = monthData.totals.find((item) => item.type === "expense");

      const incomeInPaise = income?.totalAmountInPaise || 0;
      const expenseInPaise = expense?.totalAmountInPaise || 0;

      return {
        month: monthData._id,
        income: convertPaiseToRupees(incomeInPaise),
        incomeInPaise,
        expense: convertPaiseToRupees(expenseInPaise),
        expenseInPaise,
      };
    }),

    recentTransactions: recentTransactions.map(formatTransaction),
  };
};