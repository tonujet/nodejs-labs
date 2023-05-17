import {UserErrMessType}  from "../../types/user/user-error-messages.type.js";

const userErrMess: UserErrMessType = {
    incorrectId: (id: number): string => `Id: ${id} is incorrect, you should pass number greater or equal to zero`,
    redundantId: (id: number): string => `Redundant id: ${id}`,
    notFound: (id: number): string => `User with id: ${id} not found`,
};

export {userErrMess};