import { PostService } from "./post.service.js";
import { UserService } from "./user.service.js";
import { userRepo, postRepo } from "@repository/index.js";

const postService = new PostService(postRepo);
const userService = new UserService(userRepo);

export { postService, userService, PostService, UserService };
