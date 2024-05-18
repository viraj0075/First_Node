class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something Went Wrong",
    error = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = this.errors;
  }
  // if(statck) {
  //   this.stack = statck,
  // }
  // else{
  //   Error.captureStackTree(this,this.constructor)
  // }
}
export {ApiError}