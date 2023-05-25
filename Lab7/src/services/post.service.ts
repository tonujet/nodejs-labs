import { PostRepository } from "@repository/post.repository.js";
import { CreatePostDto } from "@dto/post/create-post-dto.js";

export class PostService {
  constructor(private readonly postRepo: PostRepository) {}

  get(id: string) {
    return this.postRepo.get(id);
  }

  getAll() {
    return this.postRepo.getAll();
  }

  create(createPostDto: CreatePostDto) {
    return this.postRepo.create(createPostDto);
  }

  update(id: string, updatePostDto: CreatePostDto) {
    return this.postRepo.update(id, updatePostDto);
  }

  delete(id: string) {
    return this.postRepo.delete(id);
  }
}
