import express from "express";

const app = express();

const PORT = 5000;


app.use(express.json());

// Test route: used only to confirm that our backend is running.
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FinSentry API is running successfully.",
  });
});

// Start the backend server and listen for incoming requests.
app.listen(PORT, () => {
  console.log(`FinSentry server is running on http://localhost:${PORT}`);
});