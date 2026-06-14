import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import reportRoutes from "./routes/report.route.js";

import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FinSentry API is running successfully.",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/reports", reportRoutes);

app.use(errorHandler);

export default app;