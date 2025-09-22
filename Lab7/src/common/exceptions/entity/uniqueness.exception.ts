import { ApiException } from "@exception/api.exception.js";
import { StatusCodes } from "http-status-codes";

export class UniquenessException extends ApiException {
  static readonly message = "Uniqueness exception";
  readonly propertyMessage: string;

  constructor(
    readonly propertyName: string,
    readonly propertyValue: string,
    readonly entityName: string
  ) {
    super(UniquenessException.message, StatusCodes.FORBIDDEN);
    this.propertyMessage = this.getPropertyMessage();
  }

  private getPropertyMessage() {
    const capitalizeEntityName =
      this.entityName.charAt(0).toUpperCase() + this.entityName.slice(1);
    return `${capitalizeEntityName} ${this.propertyName}: ${this.propertyValue} is already exist. Please input another value`;
  }
}
