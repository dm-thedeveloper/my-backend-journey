
class APIError extends Error {
    constructor ( message = "Something went Wrong :) " ,statuscode = 400 , ){
  super(message);

  this.name = this.constructor.name;
  this.statuscode = statuscode
    }
}

export {APIError}