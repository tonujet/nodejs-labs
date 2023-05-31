import { ErrJsonType } from "@type/exceptions/err-json.type.js";
import { ValidationError } from "class-validator";

export interface  ExceptionHandler<T extends Error | ValidationError> {
  catch: (err: T) => ErrJsonType;
  catchArr?: (errs: T[]) => ErrJsonType;
}
