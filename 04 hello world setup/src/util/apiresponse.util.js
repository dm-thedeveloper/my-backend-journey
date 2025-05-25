class APIResponse {
    constructor(data ,msg= "Success !!" , statuscode = 201){
this.data = data;
this.msg = msg;
this.statuscode = statuscode;
    }
}

export {APIResponse}