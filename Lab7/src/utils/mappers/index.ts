import { PostMapper } from "./post.mapper.js";
import { UserMapper } from "./user.mapper.js";

const postMapper = new PostMapper();
const userMapper = new UserMapper();

export { postMapper, userMapper };
