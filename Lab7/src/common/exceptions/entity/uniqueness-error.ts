export class UniquenessError extends Error {
  public static readonly message = "Uniqueness error";

  constructor(private readonly errs: string[]) {
    super(UniquenessError.message);
  }
}
