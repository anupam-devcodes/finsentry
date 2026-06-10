import { z } from "zod";
import User from "../models/user.model.js";
import { sendMonthlyReportEmail } from "./email.service.js";
import ai from "../config/gemini.config.js";
import MonthlyReport, {
  MonthlyReportStatusEnum,
} from "../models/monthly-report.model.js";
import Transaction, {
  TransactionTypeEnum,
} from "../models/transaction.model.js";
import AppError from "../utils/app-error.js";

const aiMonthlyReportSchema = z.object({
  summary: z
    .string()
    .trim()
    .min(1, "AI summary is required")
    .max(2000, "AI summary is too long"),

  insights: z
    .array(z.string().trim().min(1).max(300))
    .min(1, "At least one AI insight is required")
    .max(5, "AI insights cannot exceed 5 items"),
});

const convertPaiseToRupees = (amountInPaise) => {
  return amountInPaise / 100;
};

const formatRupees = (amountInPaise) => {
  return `₹${convertPaiseToRupees(amountInPaise).toFixed(2)}`;
};

const getMonthDateRange = (month, year) => {
  const periodStart = new Date(year, month - 1, 1);
  const periodEnd = new Date(year, month, 1);

  return {
    periodStart,
    periodEnd,
  };
};

const formatCategoryBreakdown = (categories) => {
  return categories.map((category) => ({
    category: category._id,
    amount: convertPaiseToRupees(category.totalAmountInPaise),
    amountInPaise: category.totalAmountInPaise,
  }));
};

export const formatMonthlyReport = (report) => {
  return {
    id: report._id,
    user: report.user,

    month: report.month,
    year: report.year,
    periodStart: report.periodStart,
    periodEnd: report.periodEnd,

    totalIncome: convertPaiseToRupees(report.totalIncomeInPaise),
    totalIncomeInPaise: report.totalIncomeInPaise,

    totalExpense: convertPaiseToRupees(report.totalExpenseInPaise),
    totalExpenseInPaise: report.totalExpenseInPaise,

    balance: convertPaiseToRupees(report.balanceInPaise),
    balanceInPaise: report.balanceInPaise,

    transactionCount: report.transactionCount,

    topExpenseCategories: report.topExpenseCategories.map((category) => ({
      category: category.category,
      amount: convertPaiseToRupees(category.amountInPaise),
      amountInPaise: category.amountInPaise,
    })),

    aiSummary: report.aiSummary,
    aiInsights: report.aiInsights,

    emailSent: report.emailSent,
    emailSentAt: report.emailSentAt,
    emailFailureReason: report.emailFailureReason,
    status: report.status,

    createdAt: report.createdAt,
    updatedAt: report.updatedAt,
  };
};

const calculateMonthlyTotals = async (userId, periodStart, periodEnd) => {
  const totals = await Transaction.aggregate([
    {
      $match: {
        user: userId,
        date: {
          $gte: periodStart,
          $lt: periodEnd,
        },
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

  const incomeData = totals.find(
    (item) => item._id === TransactionTypeEnum.INCOME
  );

  const expenseData = totals.find(
    (item) => item._id === TransactionTypeEnum.EXPENSE
  );

  const totalIncomeInPaise = incomeData?.totalAmountInPaise || 0;
  const totalExpenseInPaise = expenseData?.totalAmountInPaise || 0;

  return {
    totalIncomeInPaise,
    totalExpenseInPaise,
    balanceInPaise: totalIncomeInPaise - totalExpenseInPaise,
  };
};

const calculateTopExpenseCategories = async (userId, periodStart, periodEnd) => {
  const categories = await Transaction.aggregate([
    {
      $match: {
        user: userId,
        type: TransactionTypeEnum.EXPENSE,
        date: {
          $gte: periodStart,
          $lt: periodEnd,
        },
      },
    },
    {
      $group: {
        _id: "$category",
        totalAmountInPaise: {
          $sum: "$amountInPaise",
        },
      },
    },
    {
      $sort: {
        totalAmountInPaise: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);

  return formatCategoryBreakdown(categories);
};

const calculateTransactionCount = async (userId, periodStart, periodEnd) => {
  return Transaction.countDocuments({
    user: userId,
    date: {
      $gte: periodStart,
      $lt: periodEnd,
    },
  });
};

const extractJsonFromAiText = (text) => {
  const cleanedText = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);

  const jsonText = jsonMatch ? jsonMatch[0] : cleanedText;

  try {
    return JSON.parse(jsonText);
  } catch (error) {
    throw new AppError("AI returned an invalid monthly report response.", 502);
  }
};

const buildMonthlyReportPrompt = (reportData) => {
  const topCategoriesText = reportData.topExpenseCategories.length
    ? reportData.topExpenseCategories
        .map(
          (category, index) =>
            `${index + 1}. ${category.category}: ${formatRupees(
              category.amountInPaise
            )}`
        )
        .join("\n")
    : "No expense categories found.";

  return `
You are a personal finance assistant for FinSentry AI.

Generate a short monthly financial report for the user.

Return ONLY valid JSON.
Do not return markdown.
Do not wrap response in triple backticks.
Do not add explanation outside JSON.

Required JSON shape:
{
  "summary": "one short paragraph summary",
  "insights": [
    "actionable insight 1",
    "actionable insight 2",
    "actionable insight 3"
  ]
}

Monthly financial data:
Month: ${reportData.month}
Year: ${reportData.year}
Total income: ${formatRupees(reportData.totalIncomeInPaise)}
Total expense: ${formatRupees(reportData.totalExpenseInPaise)}
Balance/Savings: ${formatRupees(reportData.balanceInPaise)}
Transaction count: ${reportData.transactionCount}

Top expense categories:
${topCategoriesText}

Rules:
- Use simple and friendly language.
- Use Indian Rupees.
- Keep summary under 120 words.
- Give 3 to 5 practical insights.
- Do not give investment, legal, or tax advice.
- If expenses are higher than income, warn politely.
- If there are very few transactions, mention that insights may be limited.
`;
};

const generateAiMonthlyReport = async (reportData) => {
  const prompt = buildMonthlyReportPrompt(reportData);

  let response;

  try {
    response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: [
        {
          text: prompt,
        },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });
  } catch (error) {
    if (error?.status === 429 || error?.message?.includes("quota")) {
      throw new AppError(
        "Gemini API quota exceeded. Please check your Gemini API key, billing, or rate limits.",
        429
      );
    }

    throw new AppError("Failed to generate monthly AI report.", 502);
  }

  const aiText = response.text;

  if (!aiText) {
    throw new AppError("AI did not return monthly report content.", 502);
  }

  const parsedAiData = extractJsonFromAiText(aiText);

  const validationResult = aiMonthlyReportSchema.safeParse(parsedAiData);

  if (!validationResult.success) {
    const error = new AppError("AI monthly report data is invalid.", 422);

    error.errors = validationResult.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    throw error;
  }

  return validationResult.data;
};

export const generateMonthlyReportData = async (userId, month, year) => {
  const { periodStart, periodEnd } = getMonthDateRange(month, year);

  const [totals, topExpenseCategories, transactionCount] = await Promise.all([
    calculateMonthlyTotals(userId, periodStart, periodEnd),
    calculateTopExpenseCategories(userId, periodStart, periodEnd),
    calculateTransactionCount(userId, periodStart, periodEnd),
  ]);

  return {
    user: userId,
    month,
    year,
    periodStart,
    periodEnd,
    totalIncomeInPaise: totals.totalIncomeInPaise,
    totalExpenseInPaise: totals.totalExpenseInPaise,
    balanceInPaise: totals.balanceInPaise,
    transactionCount,
    topExpenseCategories: topExpenseCategories.map((category) => ({
      category: category.category,
      amountInPaise: category.amountInPaise,
    })),
  };
};

export const generateOrGetMonthlyReport = async (userId, month, year) => {
  const existingReport = await MonthlyReport.findOne({
    user: userId,
    month,
    year,
  });

  if (existingReport?.aiSummary) {
    return formatMonthlyReport(existingReport);
  }

  const reportData = await generateMonthlyReportData(userId, month, year);
  const aiReport = await generateAiMonthlyReport(reportData);

  const report = await MonthlyReport.findOneAndUpdate(
    {
      user: userId,
      month,
      year,
    },
    {
      ...reportData,
      aiSummary: aiReport.summary,
      aiInsights: aiReport.insights,
      status: MonthlyReportStatusEnum.GENERATED,
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }
  );

  return formatMonthlyReport(report);
};

const getReportUser = async (userId) => {
  const user = await User.findById(userId).select("name email");

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  if (!user.email) {
    throw new AppError("User email is required to send report.", 400);
  }

  return user;
};

export const generateAndSendMonthlyReport = async (userId, month, year) => {
  const report = await generateOrGetMonthlyReport(userId, month, year);

  if (report.emailSent) {
    return {
      report,
      email: {
        skipped: true,
        reason: "Monthly report email already sent.",
      },
    };
  }

  const user = await getReportUser(userId);

  try {
    const emailResult = await sendMonthlyReportEmail({
      to: user.email,
      userName: user.name,
      report,
    });

    const updatedReport = await MonthlyReport.findOneAndUpdate(
      {
        user: userId,
        month,
        year,
      },
      {
        emailSent: true,
        emailSentAt: new Date(),
        emailFailureReason: "",
        status: MonthlyReportStatusEnum.EMAIL_SENT,
      },
      {
        new: true,
      }
    );

    return {
      report: formatMonthlyReport(updatedReport),
      email: emailResult,
    };
  } catch (error) {
    await MonthlyReport.findOneAndUpdate(
      {
        user: userId,
        month,
        year,
      },
      {
        emailSent: false,
        emailFailureReason: error.message,
        status: MonthlyReportStatusEnum.EMAIL_FAILED,
      }
    );

    throw error;
  }
};