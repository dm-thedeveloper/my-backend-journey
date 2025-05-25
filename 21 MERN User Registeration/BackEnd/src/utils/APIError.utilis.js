class APiError extends Error{

    constructor( statusCode,message = "something Went Wrong",stack=null, error=[])
    
    {

        super(message);
        this.statusCode= statusCode;
        // this.message=message;
        this.success= false;
        this.error=error;

        if(stack){
            this.stack=stack;
        }else{
            Error.captureStackTrace(this,this.constructor);
        }        
    }
} 


export{APiError};




