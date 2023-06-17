import { StatusCodes } from "http-status-codes";

export class ApiException extends Error {
  constructor(message: string, readonly status: StatusCodes) {
    super(message);
  }
}
