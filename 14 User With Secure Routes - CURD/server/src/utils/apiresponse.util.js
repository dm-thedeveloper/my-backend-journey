class APIResponse {

    constructor(data, message= "Success!" , stauscode = 202 ){

        this.data = data, 
        this.message = message , 
        this.stauscode = stauscode   
    }
}

export {APIResponse}