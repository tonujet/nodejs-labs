import { PostController } from "./post.controller.js";
import { UserController } from "./user.controller.js";
import { userService, postService } from "@service/index.js";

const postController = new PostController(postService);
const userController = new UserController(userService);

export { postController, userController };
