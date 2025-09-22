import { PostController } from "./post.controller.js";
import { UserController } from "./user.controller.js";
import { userService, postService } from "@service/index.js";
import {
  postValidator,
  userValidator,
  generalValidator,
} from "@validation/general/index.js";

const postController = new PostController(
  postService,
  postValidator,
  generalValidator
);
const userController = new UserController(
  userService,
  userValidator,
  generalValidator
);

export { postController, userController };
