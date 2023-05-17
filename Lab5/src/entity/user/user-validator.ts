import {userErrMess} from "../../common/exceptions/user/user-error-messages.js";
import {UserErrMessType} from "../../common/types/user/user-error-messages.type.js";
import {UserEntity} from "./user.entity.js";

class UserValidator {

    constructor(
        private readonly errMessages: UserErrMessType
    ) {}

    isIdValid(id: number) {
        if (Number.isNaN(id) || id < 0) {
            throw new Error(this.errMessages.incorrectId(id));
        }
    }

    isIdUndefined(id: number | undefined) {
        if (id) throw new Error(this.errMessages.redundantId(id));
    }

    isExist(user: UserEntity | null | undefined, id: number){
        if (!user) {
            throw new Error(this.errMessages.notFound(id));
        }
        return user;
    }


}

const userValidator = new UserValidator(userErrMess);
export {userValidator, UserValidator};