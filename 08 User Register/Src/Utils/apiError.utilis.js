class APIError extends Error {
  constructor(statusCode,
    message= "Something Went Wromg",
    Error=[],
    stack=""
  )
  {
    super(message);
    this.message=message;
    this.data= null;
    this.statusCode=statusCode;
    this.success=false;
    this.errors=errors;


    // if(stack){
    //     this.stack=stack
    // }else{
    //     Error.captureStacktTrace(this,this.constructor);
    // }

  }
}

export{APIError}