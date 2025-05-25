


class APIResponse {
    constructor(data, message = "Success" , statuscode = 203 ){

        this.data = data;
        this.message = message ; 
        this.statuscode = statuscode ; 
        this.success = statuscode <400;
    }
}

export {APIResponse}