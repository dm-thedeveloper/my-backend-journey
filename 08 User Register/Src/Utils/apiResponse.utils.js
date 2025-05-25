class APIResponse{
    constructor(statusCode,message="success",data ){
        this.statusCode=statusCode
        this.message=message
        this.data= data;
        this.success= statusCode<400;
    }
}

export{APIResponse}