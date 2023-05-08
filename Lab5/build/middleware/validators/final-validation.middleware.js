"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalValidationMiddleware = void 0;
function finalValidationMiddleware(err, req, res, next) {
    const errJson = {
        message: err.message, additionalInfo: err
    };
    res.status(err.status || 500).json(errJson);
}
exports.finalValidationMiddleware = finalValidationMiddleware;
