import {userErrMessGen} from "../../common/exceptions/user/user-error-message-generator.js";
import {UserErrorMessageGeneratorType} from "../../common/types/user/user-error-message-generator.type.js";
import {UserEntity} from "./user.entity.js";

class UserValidator {
    errMessGen: UserErrorMessageGeneratorType;

    constructor(errMessGen: UserErrorMessageGeneratorType) {
        this.errMessGen = errMessGen;
    }

    isIdValid(id: number): never | undefined {
        if (Number.isNaN(id) || id < 0) {
            throw new Error(this.errMessGen.incorrectId(id));
        }
        return undefined;
    }

    isIdUndefined(id: number | undefined): never | undefined {
        if (id) throw new Error(this.errMessGen.redundantId(id));
        return undefined;
    }

    isExist(user: UserEntity | null | undefined, id: number): never | UserEntity {
        if (!user) {
            throw new Error(this.errMessGen.notFound(id));
        }
        return user;
    }


}

const userValidator = new UserValidator(userErrMessGen);
export {userValidator, UserValidator};