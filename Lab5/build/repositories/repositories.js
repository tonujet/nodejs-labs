"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = exports.userRepository = void 0;
const user_repository_1 = require("./user/user.repository");
Object.defineProperty(exports, "UserRepository", { enumerable: true, get: function () { return user_repository_1.UserRepository; } });
const user_db_enum_1 = require("../common/enums/user/user-db.enum");
const parser_1 = require("../db/parsers/parser");
const user_validator_1 = require("../entity/user/user-validator");
const userKeys = ["id", "name", "username"];
const userRepository = new user_repository_1.UserRepository(user_db_enum_1.UserDbEnum.storage, user_db_enum_1.UserDbEnum.options, parser_1.csvParser, parser_1.optionParser, userKeys, user_validator_1.userValidator);
exports.userRepository = userRepository;
// read start options
userRepository.readOptions();
async function exitHandler(evtOrExitCodeOrError) {
    // write options to file before process.exit()
    await userRepository.logOptions();
    process.exit(isNaN(+evtOrExitCodeOrError) ? 1 : +evtOrExitCodeOrError);
}
[
    'beforeExit', 'SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL',
    'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM',
].forEach(evt => process.on(evt, exitHandler));
