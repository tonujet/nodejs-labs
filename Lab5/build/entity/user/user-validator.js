import { userErrMessGen } from "../../common/exceptions/user/user-error-message-generator.js";
class UserValidator {
    errMessGen;
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
const userValidator = new UserValidator(userErrMessGen);
export { userValidator, UserValidator };
