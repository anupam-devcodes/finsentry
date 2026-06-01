import express from "express";
import authRoutes from "./routes/auth.route.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FinSentry API is running successfully.",
  });
});

app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;