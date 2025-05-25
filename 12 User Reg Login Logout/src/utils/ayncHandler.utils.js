const asyncHandler  = (asyncfnx)=>{

 return (req,res,next)=>{
    Promise.resolve(asyncfnx(req,res,next))
    .catch((err)=>next(err));
}

};

export {asyncHandler}