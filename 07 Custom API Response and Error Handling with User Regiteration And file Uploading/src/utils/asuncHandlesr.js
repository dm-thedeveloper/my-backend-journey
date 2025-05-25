/*   Method to create a asyncronus Hanling Function using promise 
promise().resolve("success").reject("failed")
 first  Method
 */
 const asyncHandler = (fnx) => {
    return (req, res, next) => {
        Promise.resolve(fnx(req, res, next))
            .catch((err) => next(err));
    };
};

export { asyncHandler };



 /*   Method to create a asyncronus Hanling Function using Async / awit
 second Method
 */
// const asyncHandler =(fnx)=>{ fnx(req,res,next)=>{try {
    
// } catch (error) {
    
// }} }

// const asyncHandler = (fn)=>{ 
    //async (req,res,next)=>{

// try {
// await fn(req,res,next)

    
// } catch (err) {
//     res.status(err.code ||500).json({
//         sucess: false,
//         message:err.message
//     })
// }

// } };

// export {asyncHandler}

// asynchandler(connectDb(req,eeddb,hg,fgsds,fd))