import { ExceptionHandler } from "@interface/exceptions/exception.handler.js";
import { ErrJsonType } from "@type/exceptions/err-json.type.js";
import { StatusCodes } from "http-status-codes";
import { ApiException } from "@exception/api.exception.js";
import { AdditionalInfoType } from "@type/exceptions/default-exception/additional-info.type.js";

export class DefaultExceptionHandler<T extends Error>
  implements ExceptionHandler<T>
{
  private static readonly defaultStatus = StatusCodes.INTERNAL_SERVER_ERROR;
  private static readonly defaultMessage = "Something went wrong";

  catch(err: T): ErrJsonType {
    let status: StatusCodes | undefined;
    if (err instanceof ApiException) status = err.status;
    return {
      message: DefaultExceptionHandler.defaultMessage,
      status: status || DefaultExceptionHandler.defaultStatus,
    };
  }

  catchArr(errs: T[]): ErrJsonType {
    const additionalInfo = {} as AdditionalInfoType;
    for (const [i, err] of errs.entries()) {
      let status: StatusCodes | undefined;
      if (err instanceof ApiException) status = err.status;
      additionalInfo[`Exception${i + 1}`] = {
        message: DefaultExceptionHandler.defaultMessage,
        status: status || DefaultExceptionHandler.defaultStatus,
      };
    }
    return {
      message: "Exceptions",
      status: StatusCodes.BAD_REQUEST,
      ...additionalInfo,
    };
  }
}
