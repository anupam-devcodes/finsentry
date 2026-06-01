import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FinSentry API is running successfully.",
  });
});

app.listen(PORT, () => {
  console.log(`FinSentry server is running on http://localhost:${PORT}`);
});