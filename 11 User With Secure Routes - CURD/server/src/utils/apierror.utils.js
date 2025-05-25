class APIError extends Error {
    constructor(msg=" Something Went Wrong :)" , statuscode ,) {
        super(msg)
        this.name = this.constructor.name;
        this.statuscode = statuscode
   
    }
}

export {APIError}