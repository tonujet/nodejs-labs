import { NextFunction, Request, Response } from "express";

function clientValidationMiddleware<
    T extends { message?: string; status?: number }
>(err: T, req: Request, res: Response, next: NextFunction) {
    const errJson = {
        message: err.message,
        additionalInfo: err,
    };
    res.status(err.status || 500).json(errJson);
}

export { clientValidationMiddleware };
