class APIError extends Error {
    constructor(msg = "Something Went Wring )", statuscode = 402) {
        super(msg);
        this.name = this.constructor.name;
        this.statuscode = statuscode;
        
    }
}
export {APIError}