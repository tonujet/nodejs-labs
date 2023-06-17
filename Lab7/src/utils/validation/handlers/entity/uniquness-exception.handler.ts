import { ExceptionHandler } from "@interface/exceptions/exception.handler.js";
import { ErrJsonType } from "@type/exceptions/err-json.type.js";
import { UniquenessException } from "@exception/entity/uniqueness.exception.js";
import { AdditionalInfoType } from "@type/exceptions/uniqueness-exception/additional-info.type.js";

export class UniqunessExceptionHandler
  implements ExceptionHandler<UniquenessException>
{
  catch(err: UniquenessException): ErrJsonType {
    const { propertyName, entityName, status, message, ...props } = err;
    return {
      status: status,
      message: message,
      [entityName]: {
        [propertyName]: props,
      },
    };
  }

  catchArr(errs: UniquenessException[]): ErrJsonType {
    const { message, status } = errs[0];
    const additionalInfo = {} as AdditionalInfoType;
    for (const err of errs) {
      const { propertyName, entityName, status, message, ...props } = err;
      const entityErrInfo = additionalInfo[entityName];
      if (!entityErrInfo)
        additionalInfo[entityName] = { [propertyName]: props };
      else entityErrInfo[propertyName] = props;
    }
    return { message: message, status: status, ...additionalInfo };
  }
}
