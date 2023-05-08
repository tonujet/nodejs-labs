import {NextFunction, Request, Response} from "express";

function finalValidationMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    const errJson = {
        message: err.message, additionalInfo: err
    };
    res.status(err.status || 500).json(errJson);
}

export {finalValidationMiddleware};