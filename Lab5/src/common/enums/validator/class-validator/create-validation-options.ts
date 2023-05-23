import { ValidatorOptions } from "class-validator";

export const createValidationOptions: ValidatorOptions = {
    whitelist: true,
    forbidUnknownValues: true,
};
