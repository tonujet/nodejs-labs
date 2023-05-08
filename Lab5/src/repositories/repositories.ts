import {UserRepository} from "./user/user.repository";
import {UserDbEnum} from "../common/enums/user/user-db.enum";
import {csvParser, optionParser} from "../db/parsers/parser";
import {UserEntity} from "../entity/user/user.entity";
import {userValidator} from "../entity/user/user-validator";

const userKeys: (keyof UserEntity)[] = ["id", "name", "username"] as (keyof UserEntity)[];

const userRepository = new UserRepository(
    UserDbEnum.storage,
    UserDbEnum.options,
    csvParser,
    optionParser,
    userKeys,
    userValidator
);

// read start options
userRepository.readOptions();


async function exitHandler(evtOrExitCodeOrError: number | string | Error): Promise<void> {
// write options to file before process.exit()
    await userRepository.logOptions();
    process.exit(isNaN(+evtOrExitCodeOrError) ? 1 : +evtOrExitCodeOrError);
}

[
    'beforeExit', 'SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL',
    'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM',
].forEach(evt => process.on(evt, exitHandler));

export {userRepository, UserRepository};
