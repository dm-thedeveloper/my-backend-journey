class ApiResponse{

constructor(statusCode,data,message="success"){
    this.statusCode=statusCode;
    this.data=data;
    message=message;
    this.success=statusCode<400;
}

}


export {ApiResponse}