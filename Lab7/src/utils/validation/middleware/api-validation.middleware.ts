import { NextFunction, Request, Response } from "express";
import { ValidationError } from "class-validator";
import { handleException } from "@validation/handlers/index.js";
import { StatusCodes } from "http-status-codes";

export const apiValidationMiddleware = <T extends Error>(
  err: T | T[] | ValidationError | ValidationError[],
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status, message, ...props } = handleException(err);
  res.status(status).json({
    status: StatusCodes[status],
    message: message,
    ...props,
  });
};
