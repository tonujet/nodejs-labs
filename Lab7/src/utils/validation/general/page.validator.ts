import { ForbiddenException } from "@exception/entity/forbidden.exception.js";

export class PageValidator {
  isCorrectParams(page?: number, take?: number) {
    if (!take && page) {
      throw new ForbiddenException("You have to define take when you use page");
    }
  }
}
