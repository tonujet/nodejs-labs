import { PostEntity } from "@entity/post.entity.js";
import { PostDto } from "@dto/post/post.dto.js";
import { plainToInstance } from "class-transformer";
import { CreatePostDto } from "@dto/post/create-post.dto.js";
import { UserEntity } from "@entity/user.entity.js";
import { UserDto } from "@dto/user/user.dto.js";

export class PostMapper {
  toDto(post: PostEntity): PostDto {
    return plainToInstance(PostDto, post, { excludeExtraneousValues: true });
  }

  toDtoArr(posts: PostEntity[]): PostDto[] {
    return posts.map(this.toDto);
  }

  toEntity(postDto: CreatePostDto, user: UserDto): PostEntity {
    const { userId, ...rest } = postDto;
    return { user, ...rest } as PostEntity;
  }

  toEntityArr(postDtos: CreatePostDto[], users: UserEntity[]): PostEntity[] {
    return postDtos.map((postDto, i) => this.toEntity(postDto, users[i]));
  }
}
