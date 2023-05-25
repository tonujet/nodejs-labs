import { dataSource } from "../typeorm.config.js";
import { UserEntity } from "../db/entities/user.entity.js";
import { PostEntity } from "../db/entities/post.entity.js";
import { UserRepository } from "./user.repository.js";
import { PostRepository } from "./post.repository.js";
import { postMapper, userMapper } from "../mappers/index.js";

const userDao = dataSource.getRepository(UserEntity);
const postDao = dataSource.getRepository(PostEntity);

const userRepo = new UserRepository(userDao, userMapper);
const postRepo = new PostRepository(postDao, userRepo, postMapper);

export { userRepo, postRepo };
