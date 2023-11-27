/*
1. Make a function to handle the async request 
2. 
*/

const asyncHandler = (requestHanler) => {
  return (req, res, next) => {
    Promise.resolve(requestHanler(req, res, next)).catch((err) => {
      next(err);
    });
  };
};

export { asyncHandler };

// const asyncHandler = ()=>{}
// const asyncHandler = (func)=>{()=>{}}
// const asyncHandler = (func)=>()=>{}

// const asyncHandler = (fn) => async (req,res,next) => {
//  try {
// await finally(req,res,next)
//  } catch (error) {
//   res.status(error.code || 404).json({
//     success:false,
//     message: error.message,
//   })
//  }
// };
