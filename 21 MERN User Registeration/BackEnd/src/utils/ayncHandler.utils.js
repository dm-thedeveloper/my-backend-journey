

// const asyncHandler = ()=>{}


    // const asyncHandler =(asyncFnx)=>{
    //     return (req,res,next)=>{
    //         Promise.resolve(asyncFnx(req,res,next))
    //         .catch((error)=>next(error))
    //     }
    // };
    // export {asyncHandler};



    const asyncHandler = (asyncFnx )=>{

        return(req,res,next)=>{

            Promise.resolve(asyncFnx(req,res,next))
            .catch((error)=>next(error))
        }
     };

     export {asyncHandler}