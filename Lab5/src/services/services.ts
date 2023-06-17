import { UserService } from "./user/user.service.js";
import { userRepository } from "@repositories/repositories.js";
const userService = new UserService(userRepository);
export { userService, UserService };
