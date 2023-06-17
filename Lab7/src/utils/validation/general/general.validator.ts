import { ForbiddenException } from "@exception/entity/forbidden.exception.js";

export class GeneralValidator {
  uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  validateUUID(id: string) {
    if (!this.uuidRegex.test(id))
      throw new ForbiddenException("id must be as uuid");
    return id;
  }
}
