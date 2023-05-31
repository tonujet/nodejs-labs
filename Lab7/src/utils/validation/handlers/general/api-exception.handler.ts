import { ExceptionHandler } from "@interface/exceptions/exception.handler.js";
import { ApiException } from "@exception/api.exception.js";
import { ErrJsonType } from "@type/exceptions/err-json.type.js";

export class ApiExceptionHandler<T extends ApiException>
  implements ExceptionHandler<T>
{
  catch(err: T): ErrJsonType {
    return { ...err, message: err.message };
  }
}
