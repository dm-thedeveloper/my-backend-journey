class APIError extends Error {
    constructor(message="something went wrong", statusCode) {

        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode || 500;
        // Error.captureStackTkrace(this, this.constructor);
    }
}



class APIResponse {
    constructor(data, message = 'Success', statusCode = 200) {
        this.data = data;
        this.message = message;
        this.statusCode = statusCode;
    }

}







export { APIError,APIResponse};
