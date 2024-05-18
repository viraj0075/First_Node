//with the Promise
const AsyncHandlers = (requestHandler) => {
    return (req,res,next) => {
     Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
};

export { AsyncHandlers };

//with the try and catch
// const AsyncHandlers = () => {};
// const AsyncHandlers = () => {return (() => {})};

// const AsyncHandlers = (fun) => async (err, req, res, next) => {
//   try {
//     await fun(req,res,next)
//   } catch (error) {
//     res.status(err.code || 500),
//       json({
//         success: false,
//         message: err.message,
//       });
//   }
// };
