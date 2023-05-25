import { PostService } from "@service/index.js";
import { Request, Response } from "express";
import { validateUUID } from "@validation/general/validateUUID.js";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import {
  createValidationOptions,
  updateValidationOptions,
} from "@enum/validator/index.js";
import { CreatePostDto } from "@dto/post/create-post-dto.js";

export class PostController {
  constructor(private readonly postService: PostService) {}

  get = (req: Request, res: Response) => {
    const uuid = validateUUID(req.params.id);
    return this.postService.get(uuid).then(post => res.json(post));
  };

  getAll = (req: Request, res: Response) => {
    return this.postService.getAll().then(posts => res.json(posts));
  };

  create = async (req: Request, res: Response) => {
    const createPostDto = plainToInstance(CreatePostDto, req.body);
    await validateOrReject(createPostDto, createValidationOptions);
    return res.json(await this.postService.create(createPostDto));
  };

  update = async (req: Request, res: Response) => {
    const updatedPostDto = plainToInstance(CreatePostDto, req.body);
    await validateOrReject(updatedPostDto, updateValidationOptions);
    const uuid = validateUUID(req.params.id);
    return res.json(await this.postService.update(uuid, updatedPostDto));
  };

  delete = (req: Request, res: Response) => {
    const uuid = validateUUID(req.params.id);
    return this.postService
      .delete(uuid)
      .then(deletedPost => res.json(deletedPost));
  };
}
