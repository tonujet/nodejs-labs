function finalValidationMiddleware(err, req, res, next) {
    const errJson = {
        message: err.message, additionalInfo: err
    };
    res.status(err.status || 500).json(errJson);
}
export { finalValidationMiddleware };
