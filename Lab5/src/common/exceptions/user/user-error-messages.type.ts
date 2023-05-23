import { UserErrMessType } from "@customTypes//user/user-error-messages.js";

const userErrMess: UserErrMessType = {
    incorrectId: id =>
        `Id: ${id} is incorrect, you should pass number greater or equal to zero`,
    redundantId: id => `Redundant id: ${id}`,
    notFound: id => `User with id: ${id} not found`,
};

export { userErrMess };
