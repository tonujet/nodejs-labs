import { Repository } from "typeorm";
import { PostEntity } from "@entity/post.entity.js";
import { CreatePostDto } from "@dto/post/create-post.dto.js";
import { UserRepository } from "@repository/user.repository.js";
import { PostDto } from "@dto/post/post.dto.js";
import { PostMapper } from "@mapper/post.mapper.js";
import { EntityNotFoundException } from "@exception/entity/entity-not-found.exception.js";

export class PostRepository {
  constructor(
    private readonly postDao: Repository<PostEntity>,
    private readonly userRepo: UserRepository,
    private readonly postMapper: PostMapper
  ) {}

  get(id: string): Promise<PostDto> {
    return this.postDao
      .findOneOrFail({
        where: { id },
        relations: ["user"],
      })
      .then(this.postMapper.toDto)
      .catch(() => {
        throw new EntityNotFoundException("post", "id", id);
      });
  }

  getAll(): Promise<PostDto[]> {
    return this.postDao
      .find({ relations: ["user"] })
      .then(posts => this.postMapper.toDtoArr(posts));
  }

  async create(createPostDto: CreatePostDto): Promise<PostDto> {
    const user = await this.userRepo.get(createPostDto.userId);
    const post = this.postMapper.toEntity(createPostDto, user);
    return this.postDao.save(post).then(this.postMapper.toDto);
  }

  async update(id: string, updatePostDto: CreatePostDto): Promise<PostDto> {
    const currPost = await this.get(id);
    const newPost = { ...currPost, ...updatePostDto };
    await this.postDao.update({ id }, newPost);
    return this.get(id);
  }

  async delete(id: string): Promise<PostDto> {
    const deletedPost = await this.get(id);
    await this.postDao.delete({ id });
    return deletedPost;
  }
}
