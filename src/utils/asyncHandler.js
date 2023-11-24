const asyncHandler = (requestHanler) => {
  (req, res, next) => {
    Promise.resolve(requestHanler(req, res, next)).catch((err) => {
      next(error);
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
