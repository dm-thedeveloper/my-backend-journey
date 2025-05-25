class ApiError extends Error {

constructor(
    statusCode,
    message="Something went Wrong",
    Error=[],
    stack="",
){
    super(message);
    this.statusCode=statusCode;
    this.message=message;
    this.data= null;
    this.success= false;
    this.errors=errors;


    if(stack){   
        this.stack=stack
    }else{
        Error.captureStacktTrace(this,this.constructor)
    }
}


}

export {ApiError}