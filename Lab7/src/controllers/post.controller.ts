import { PostService } from "@service/index.js";
import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { CreatePostDto } from "@dto/post/create-post.dto.js";
import { PostValidator } from "@validation/general/post.validator.js";
import { GeneralValidator } from "@validation/general/general.validator.js";

export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly postValidator: PostValidator,
    private readonly generalValidator: GeneralValidator
  ) {}

  get = (req: Request, res: Response) => {
    const uuid = this.generalValidator.validateUUID(req.params.id);
    return this.postService.get(uuid).then(post => res.json(post));
  };

  getAll = (req: Request, res: Response) => {
    return this.postService.getAll().then(posts => res.json(posts));
  };

  create = async (req: Request, res: Response) => {
    const createPostDto = plainToInstance(CreatePostDto, req.body);
    await this.postValidator.validateCreateDto(createPostDto);
    return res.json(await this.postService.create(createPostDto));
  };

  update = async (req: Request, res: Response) => {
    const updatedPostDto = plainToInstance(CreatePostDto, req.body);
    await this.postValidator.validateUpdateDto(updatedPostDto);
    const uuid = this.generalValidator.validateUUID(req.params.id);
    return res.json(await this.postService.update(uuid, updatedPostDto));
  };

  delete = (req: Request, res: Response) => {
    const uuid = this.generalValidator.validateUUID(req.params.id);
    return this.postService
      .delete(uuid)
      .then(deletedPost => res.json(deletedPost));
  };
}
