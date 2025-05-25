const asynHandler = (asyncFnx)=>{


    return (req,res,next) =>{
        Promise.resolve(asyncFnx(req,res,next)).catch((err)=>{next(err)})
    }

}

export{asynHandler}