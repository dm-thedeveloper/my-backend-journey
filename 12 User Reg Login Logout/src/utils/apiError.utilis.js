class APIError extends Error {
    constructor(statusCode, message = "Something Went Wrong", stack = null,error=[]) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;  // Assuming that an API error indicates a failure, so success is false.
        this.error=error;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }}
export {APIError}