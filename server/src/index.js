import dotenv from "dotenv";
import app from "./app.js";
import connectDatabase from "./config/database.config.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`FinSentry server is running on http://localhost:${PORT}`);
  });
};

startServer();