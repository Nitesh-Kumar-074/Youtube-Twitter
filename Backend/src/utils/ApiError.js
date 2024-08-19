class ApiError extends Error{
       constructor(
              statuscode = 400,
              message = "Something went wrong",

       ){
              this.statuscode = statuscode
              this.message = message
       }
}

export { ApiError }