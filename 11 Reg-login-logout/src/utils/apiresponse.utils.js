class APIResponse {
    constructor(data,message = "Response Success !!",statuscode = 202) {
        
        this.data = data;
        this.message = message;
        this.statuscode = statuscode
    }
}


export {APIResponse} 
