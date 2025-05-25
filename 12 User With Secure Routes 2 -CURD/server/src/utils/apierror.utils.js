class APIError extends Error {
    constructor(message = "Some Thing Went Wrong :)_ " , statuscode  = 401) {
        super(message)
        this.name  = this.constructor.name ; 
        this.statuscode  = statuscode

    }
}

export {APIError}