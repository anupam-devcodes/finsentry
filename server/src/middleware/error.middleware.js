const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  const message =
    error.isOperational || process.env.NODE_ENV !== "production"
      ? error.message
      : "Internal server error.";

  if (process.env.NODE_ENV !== "production") {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;