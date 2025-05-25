class APIError  extends Error{

    constructor(msg= "Something Went Wrong" , stauscode  =403) {
        super(msg); 
        this.name = this.constructor.name;
        this.stauscode = stauscode;
    }
}

export {APIError}