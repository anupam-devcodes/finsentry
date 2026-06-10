import mongoose from "mongoose";

export const MonthlyReportStatusEnum = {
  GENERATED: "generated",
  EMAIL_SENT: "email_sent",
  EMAIL_FAILED: "email_failed",
};

const monthlyReportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Monthly report must belong to a user"],
      index: true,
    },

    month: {
      type: Number,
      required: [true, "Report month is required"],
      min: [1, "Month must be between 1 and 12"],
      max: [12, "Month must be between 1 and 12"],
    },

    year: {
      type: Number,
      required: [true, "Report year is required"],
    },

    periodStart: {
      type: Date,
      required: [true, "Report period start date is required"],
    },

    periodEnd: {
      type: Date,
      required: [true, "Report period end date is required"],
    },

    totalIncomeInPaise: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalExpenseInPaise: {
      type: Number,
      default: 0,
      min: 0,
    },

    balanceInPaise: {
      type: Number,
      default: 0,
    },

    transactionCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    topExpenseCategories: [
      {
        category: {
          type: String,
          required: true,
          trim: true,
        },

        amountInPaise: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    aiSummary: {
      type: String,
      trim: true,
      default: "",
    },

    aiInsights: [
      {
        type: String,
        trim: true,
      },
    ],

    emailSent: {
      type: Boolean,
      default: false,
    },

    emailSentAt: {
      type: Date,
      default: null,
    },

    emailFailureReason: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: Object.values(MonthlyReportStatusEnum),
      default: MonthlyReportStatusEnum.GENERATED,
    },
  },
  {
    timestamps: true,
  }
);

monthlyReportSchema.index(
  { user: 1, year: 1, month: 1 },
  { unique: true }
);

const MonthlyReport = mongoose.model("MonthlyReport", monthlyReportSchema);

export default MonthlyReport;