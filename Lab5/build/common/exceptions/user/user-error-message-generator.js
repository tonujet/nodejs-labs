"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userErrMessGen = void 0;
const userErrMessGen = {
    incorrectId: (id) => `Id: ${id} is incorrect, you should pass number greater or equal to zero`,
    redundantId: (id) => `Redundant id: ${id}`,
    notFound: (id) => `User with id: ${id} not found`,
};
exports.userErrMessGen = userErrMessGen;
