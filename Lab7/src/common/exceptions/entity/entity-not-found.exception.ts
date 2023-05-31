import { ApiException } from "@exception/api.exception.js";
import { StatusCodes } from "http-status-codes";

export class EntityNotFoundException extends ApiException {
  constructor(
    readonly entity: string,
    readonly propName: string,
    readonly value: unknown
  ) {
    super(
      `Could not find entity: ${entity} with ${propName}: ${value}`,
      StatusCodes.NOT_FOUND
    );
  }
}
