import {userErrMess} from "../../common/exceptions/user/user-error-messages.js";
import {UserErrMessType} from "../../common/types/user/user-error-messages.type.js";
import {UserEntity} from "./user.entity.js";

class UserValidator {
    errMessages: UserErrMessType;

    constructor(errMessGen: UserErrMessType) {
        this.errMessages = errMessGen;
    }

    isIdValid(id: number): never | undefined {
        if (Number.isNaN(id) || id < 0) {
            throw new Error(this.errMessages.incorrectId(id));
        }
        return undefined;
    }

    isIdUndefined(id: number | undefined): never | undefined {
        if (id) throw new Error(this.errMessages.redundantId(id));
        return undefined;
    }

    isExist(user: UserEntity | null | undefined, id: number): never | UserEntity {
        if (!user) {
            throw new Error(this.errMessages.notFound(id));
        }
        return user;
    }


}

const userValidator = new UserValidator(userErrMess);
export {userValidator, UserValidator};