import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import reportRoutes from "./routes/report.route.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://finsentry-eta.vercel.app",
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login/register attempts. Please try again later.",
  },
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FinSentry API is running successfully.",
  });
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/users", apiLimiter, userRoutes);
app.use("/api/transactions", apiLimiter, transactionRoutes);
app.use("/api/analytics", apiLimiter, analyticsRoutes);
app.use("/api/reports", apiLimiter, reportRoutes);

app.use(errorHandler);

export default app;