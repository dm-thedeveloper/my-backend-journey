class APIError extends Error {
    constructor(message  = "Something Went Wrong :)",stauscode){
        super(message);
        this.name = this.constructor.name;
        this.stauscode =stauscode

    }
}

export {APIError}