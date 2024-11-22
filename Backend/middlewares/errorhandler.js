//not found method
const notFound=(req,res,next)=>{
    const error =new Error(`Not Found ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Correct comparison
    res.status(statusCode); // Set the status code in the response
    res.json({
        message: err.message, // Access the error message
        stack: err?.stack // Optionally hide stack in production
    });
};

module.exports={notFound,errorHandler}