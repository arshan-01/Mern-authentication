// utils/api.utils.js
class ApiError extends Error {
  constructor(statusCode, message = 'Something went wrong', errors = [], stack = '') {
    super(message)
    this.statusCode = statusCode
    this.message = message
    this.errors = errors
    this.success = false

    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

class ApiResponse {
  constructor(statusCode, data, message = 'Success') {
    this.statusCode = statusCode
    this.data = data
    this.message = message
    this.success = statusCode < 400
  }
}

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next))
      .catch((err) => {
        // Handle Joi validation errors
        if (err.isJoi) {
          // If it’s a Joi error, format it accordingly
          return res.status(400).json({
            success: false,
            message: err.details[0].message, // Send the specific error message
          });
        }
        
        // Handle other errors
        next(err);
      });
  };
};



export { ApiError, ApiResponse, asyncHandler }
