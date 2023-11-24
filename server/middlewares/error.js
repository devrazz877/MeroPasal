import ErrorHandler from "../utilis/errorHandler.js";

export const errorListening = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "internal server error"

    //wrong mongoid error

    if(err.name === "CastError"){
        const message = `resourse not found:${err.path}`
        err = new ErrorHandler(message,400)
    }

    //duplicate error
    if(err.code === 11000)
    {
        const message = `Duplicate:${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message,400)
    }
    //jsonwebtoken error
    if(err.name === "JsonWebTokenError")
    {
        const message = `invalid token, try again`
        err = new ErrorHandler(message,400)
    }
    //token expired
    if(err.name === "TokenExpiredError")
    {
        const message = `token has been expired`
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })

}
export default errorListening
