import { ExceptionHandler } from "@interface/exceptions/exception.handler.js";
import { InternalException } from "@exception/internal.exception.js";
import { ErrJsonType } from "@type/exceptions/err-json.type.js";

export class InternalExceptionHandler<T extends InternalException>
  implements ExceptionHandler<T>
{
  catch({ message, status, systemInfo }: T): ErrJsonType {
    // it can be logging to file
    console.log(systemInfo);
    return { message, status };
  }

  catchArr(errs: T[]): ErrJsonType {
    const { message, status } = errs[0];
    for (const err of errs) {
      // it can be logging to file
      console.log(err.systemInfo);
    }
    return { message, status };
  }
}
