import { NextFunction, Request, Response } from "express";
import url from "url";
import { StatusCodes } from "http-status-codes";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = StatusCodes.NOT_FOUND;
  const err = {
    message: getMessage(req),
    status: StatusCodes[status],
  }
  res.status(status).json(err);
}


const getMessage = (req: Request) => {
  return `Couldn\`t find any with url: ${url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  })}`
}