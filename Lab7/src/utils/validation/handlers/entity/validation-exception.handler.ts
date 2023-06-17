import { ExceptionHandler } from "@interface/exceptions/exception.handler.js";
import { ErrJsonType } from "@type/exceptions/err-json.type.js";
import { StatusCodes } from "http-status-codes";
import { ValidationError } from "class-validator";
import { AdditionalInfoType } from "@type/exceptions/validation-exception/additional-info.type.js";

export class ValidationExceptionHandler
  implements ExceptionHandler<ValidationError>
{
  private static readonly message = "Something went wrong";
  private static readonly status = StatusCodes.INTERNAL_SERVER_ERROR;

  private parse(
    { property, value, constraints }: ValidationError,
    additionalInfo: AdditionalInfoType
  ) {
    additionalInfo[property] = {
      value: value || "absent",
      ...constraints,
    };
    return additionalInfo;
  }

  catch(err: ValidationError): ErrJsonType {
    const additionalInfo = this.parse(err, {} as AdditionalInfoType);
    return {
      message: ValidationExceptionHandler.message,
      status: ValidationExceptionHandler.status,
      ...additionalInfo,
    };
  }

  catchArr(errs: ValidationError[]): ErrJsonType {
    const additionalInfo = {} as AdditionalInfoType;
    for (const { property, value, constraints } of errs) {
      additionalInfo[property] = {
        value: value || "absent",
        ...constraints,
      };
    }
    return {
      message: ValidationExceptionHandler.message,
      status: ValidationExceptionHandler.status,
      ...additionalInfo,
    };
  }
}
