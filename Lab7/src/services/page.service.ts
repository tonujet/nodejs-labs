import { PageValidator } from "@validation/general/page.validator.js";

export class PageService {
  constructor(private readonly pageValidator: PageValidator) {}

  calcSkip(page?: number, take?: number): number {
    let skip = 0;
    if (take && page) {
      skip = (page - 1) * take;
    }
    this.pageValidator.isCorrectParams(page, take);
    return skip;
  }
}
