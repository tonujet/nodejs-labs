import { createValidationOptions } from "@enum/validator/create-validation-options.js";
import { ValidatorOptions } from "class-validator";

export const updateValidationOptions: ValidatorOptions = {
  ...createValidationOptions,
  skipMissingProperties: true,
};
