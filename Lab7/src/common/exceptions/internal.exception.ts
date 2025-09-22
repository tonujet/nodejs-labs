import { ApiException } from "@exception/api.exception.js";
import { StatusCodes } from "http-status-codes";

export class InternalException extends ApiException {
  static readonly message = "Internal exception";
  static readonly status = StatusCodes.INTERNAL_SERVER_ERROR;

  constructor(readonly systemInfo: string) {
    super(InternalException.message, InternalException.status);
  }
}
