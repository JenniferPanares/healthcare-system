// Custom error handler class
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); // Set error message
    this.statusCode = statusCode; // Set status code
  }
}

// Middleware to handle errors
export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Something went wrong"; // Default error message
  err.statusCode = err.statusCode || 500; // Default status code

  // Handle duplicate key error (e.g., MongoDB)
  if (err.code === 11000) {
    const message = `Duplicate field: ${Object.keys(err.keyValue)}. Please use a different value.`;
    err = new ErrorHandler(message, 400);
  }

  // Handle invalid JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Invalid token. Please log in again.`;
    err = new ErrorHandler(message, 401);
  }

  // Handle expired JWT error
  if (err.name === "TokenExpiredError") {
    const message = `Session expired. Please log in again.`;
    err = new ErrorHandler(message, 401);
  }

  // Handle invalid object ID (CastError)
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}. Please check your input.`;
    err = new ErrorHandler(message, 400);
  }

  // Handle validation errors
  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;

  // Send error response
  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler;
