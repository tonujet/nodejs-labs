import { NextFunction, Request, Response } from "express";

function apiValidationMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  const errJson = {
    message: err.message,
    additionalInfo: err,
  };
  res.status(err.status || 500).json(errJson);
}

export { apiValidationMiddleware };
