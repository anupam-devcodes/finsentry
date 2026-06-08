const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  const message =
    error.isOperational || process.env.NODE_ENV !== "production"
      ? error.message
      : "Internal server error.";

  if (process.env.NODE_ENV !== "production") {
    console.error(error);
  }

  const response = {
    success: false,
    message,
  };

  if (error.errors) {
    response.errors = error.errors;
  }

  res.status(statusCode).json(response);
};

export default errorHandler;