class AppError extends Error{
    constructor(message, statusCode, successStatus, errorData = null) {
        super(message)
        this.statusCode = statusCode
        this.successStatus = successStatus,
        this.errorData = errorData    
            
    }
}




export default AppError