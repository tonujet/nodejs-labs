import { ApiException } from "@exception/api.exception.js";
import { StatusCodes } from "http-status-codes";

export class ForbiddenException extends ApiException {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
  }
}
