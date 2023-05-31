import { UniquenessException } from "@exception/entity/uniqueness.exception.js";
import { ValidationError } from "class-validator";
import { ErrJsonType } from "@type/exceptions/err-json.type.js";
import { ApiException } from "@exception/api.exception.js";
import { ValidationExceptionHandler } from "./entity/validation-exception.handler.js";
import { UniqunessExceptionHandler } from "./entity/uniquness-exception.handler.js";
import { ExceptionHandler } from "@interface/exceptions/exception.handler.js";
import { InternalException } from "@exception/internal.exception.js";
import { ApiExceptionHandler } from "./general/api-exception.handler.js";
import { ErrorHandler } from "./general/error.handler.js";
import { InternalExceptionHandler } from "./general/internal-exception.handler.js";
import { DefaultExceptionHandler } from "./general/default-exception.handler.js";
import { EntityNotFoundException } from "@exception/entity/entity-not-found.exception.js";
import { ForbiddenException } from "@exception/entity/forbidden.exception.js";

const defaultExceptionHandler = new DefaultExceptionHandler();
const apiExceptionHandler = new ApiExceptionHandler();
const uniqunessExceptionHandler = new UniqunessExceptionHandler();
const errorHandler = new ErrorHandler();
const internalExceptionHandler = new InternalExceptionHandler();
const validationExceptionHandler = new ValidationExceptionHandler();

const errHandlers = new Map<object, ExceptionHandler<any>>([
  [ValidationError.prototype, validationExceptionHandler],
  [Error.prototype, errorHandler],
  [InternalException.prototype, internalExceptionHandler],
  [ApiException.prototype, apiExceptionHandler],
  [UniquenessException.prototype, uniqunessExceptionHandler],
  [EntityNotFoundException.prototype, apiExceptionHandler],
  [ForbiddenException.prototype, apiExceptionHandler],
]);

const getErrHandler = (obj: object) => {
  let handler;
  if (!Array.isArray(obj))
    handler = errHandlers.get(Object.getPrototypeOf(obj));
  else {
    let err = obj[0];
    if (!err) err = new InternalException("Array of errors is empty");
    handler = errHandlers.get(Object.getPrototypeOf(err));
  }
  return handler || defaultExceptionHandler;
};

export const handleException = <T extends Error>(
  err: T | T[] | ValidationError | ValidationError[]
): ErrJsonType => {
  const handler = getErrHandler(err);
  if (Array.isArray(err) && handler.catchArr)
    return handler.catchArr(err as Error[]);
  return handler.catch(err as Error);
};
