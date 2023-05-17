import {UserRepository} from "./user/user.repository.js";
import {ENV} from "../common/enums/env/env.enum.js";
import {csvParser, optionParser} from "../db/parsers/parser.js";
import {UserEntity} from "../entity/user/user.entity.js";
import {userValidator} from "../entity/user/user-validator.js";

const userKeys = ["id", "name", "username"] as (keyof UserEntity)[];

const userRepository = new UserRepository(
    ENV.USER.STORAGE_PATH,
    ENV.USER.OPTIONS_PATH,
    csvParser,
    optionParser,
    userKeys,
    userValidator
);

// read start options
userRepository.readOptions();


async function exitHandler(evtOrExitCodeOrError: number | string | Error) {
// write options to file before process.exit()
    await userRepository.logOptions();
    process.exit(isNaN(+evtOrExitCodeOrError) ? 1 : +evtOrExitCodeOrError);
}

[
    'beforeExit', 'SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL',
    'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM',
].forEach(evt => process.on(evt, exitHandler));

export {userRepository, UserRepository};
