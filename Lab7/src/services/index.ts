import { PostService } from "./post.service.js";
import { UserService } from "./user.service.js";
import { userRepo, postRepo } from "@repository/index.js";
import { PageService } from "@service/page.service.js";
import { pageValidator } from "@validation/general/index.js";

const pageService = new PageService(pageValidator);
const postService = new PostService(postRepo);
const userService = new UserService(userRepo, pageService);

export { postService, userService, PostService, UserService };
