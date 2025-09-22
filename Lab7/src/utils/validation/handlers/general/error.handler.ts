import { ExceptionHandler } from "@interface/exceptions/exception.handler.js";
import { ErrJsonType } from "@type/exceptions/err-json.type.js";
import { StatusCodes } from "http-status-codes";

export class ErrorHandler<T extends Error> implements ExceptionHandler<T> {
  private static readonly message = "ERROR";
  private static readonly status = StatusCodes.INTERNAL_SERVER_ERROR;

  catch(err: T): ErrJsonType {
    console.log(err);
    return { message: ErrorHandler.message, status: ErrorHandler.status };
  }

  catchArr(errs: T[]): ErrJsonType {
    console.log(errs);
    return { message: ErrorHandler.message, status: ErrorHandler.status };
  }
}
