import {userErrMess} from "@exceptions/user/user-error-messages.type.js";
import {UserErrMessType} from "@customTypes/user/user-error-messages.js";
import {UserEntity} from "./user.entity.js";

class UserValidator {

    constructor(
        private readonly errMessages: UserErrMessType
    ) {}

    isIdValid(id: string) {
        const parsedId = +id;
        if (Number.isNaN(parsedId) || parsedId < 0) {
            throw new Error(this.errMessages.incorrectId(parsedId));
        }
        return parsedId;
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