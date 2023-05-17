import {UserErrMessType}  from "../../types/user/user-error-messages.type.js";

const userErrMess: UserErrMessType = {
    incorrectId: id => `Id: ${id} is incorrect, you should pass number greater or equal to zero`,
    redundantId: id=> `Redundant id: ${id}`,
    notFound: id => `User with id: ${id} not found`,
};

export {userErrMess};