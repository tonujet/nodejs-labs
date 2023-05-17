import { UserRepository } from "./user/user.repository.js";
import { UserDbEnum } from "../common/enums/user/user-db.enum.js";
import { csvParser, optionParser } from "../db/parsers/parser.js";
import { userValidator } from "../entity/user/user-validator.js";
const userKeys = ["id", "name", "username"];
const userRepository = new UserRepository(UserDbEnum.storage, UserDbEnum.options, csvParser, optionParser, userKeys, userValidator);
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
export { userRepository, UserRepository };
