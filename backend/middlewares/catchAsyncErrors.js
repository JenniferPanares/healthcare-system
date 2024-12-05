// Middleware to handle async errors
export const catchAsyncErrors = (theFunction) => {
  return (req, res, next) => {
    // Resolve the function and catch any errors
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};
