"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = exports.userValidator = void 0;
const user_error_message_generator_1 = require("../../common/exceptions/user/user-error-message-generator");
class UserValidator {
    constructor(errMessGen) {
        this.errMessGen = errMessGen;
    }
    isIdValid(id) {
        if (Number.isNaN(id) || id < 0) {
            throw new Error(this.errMessGen.incorrectId(id));
        }
        return undefined;
    }
    isIdUndefined(id) {
        if (id)
            throw new Error(this.errMessGen.redundantId(id));
        return undefined;
    }
    isExist(user, id) {
        if (!user) {
            throw new Error(this.errMessGen.notFound(id));
        }
        return user;
    }
}
exports.UserValidator = UserValidator;
const userValidator = new UserValidator(user_error_message_generator_1.userErrMessGen);
exports.userValidator = userValidator;
