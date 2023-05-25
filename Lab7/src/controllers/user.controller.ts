import { UserService } from "@service/index.js";
import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { CreateUserDto } from "@dto/user/create-user-dto.js";
import { validateOrReject } from "class-validator";
import {
  createValidationOptions,
  updateValidationOptions,
} from "@enum/validator/index.js";
import { validateUUID } from "@validation/general/validateUUID.js";

export class UserController {
  constructor(private readonly userService: UserService) {}

  get = (req: Request, res: Response) => {
    const uuid = validateUUID(req.params.id);
    return this.userService.get(uuid).then(user => res.json(user));
  };

  getWithPosts = (req: Request, res: Response) => {
    const uuid = validateUUID(req.params.id);
    return this.userService.getWithPosts(uuid).then(user => res.json(user));
  };

  getAll = (req: Request, res: Response) => {
    return this.userService.getAll().then(users => res.json(users));
  };

  getAllWithPosts = (req: Request, res: Response) => {
    return this.userService.getAllWithPosts().then(users => res.json(users));
  };

  create = async (req: Request, res: Response) => {
    const createUserDto = plainToInstance(CreateUserDto, req.body);
    await validateOrReject(createUserDto, createValidationOptions);
    return res.json(await this.userService.create(createUserDto));
  };

  update = async (req: Request, res: Response) => {
    const updatedUserDto = plainToInstance(CreateUserDto, req.body);
    await validateOrReject(updatedUserDto, updateValidationOptions);
    const uuid = validateUUID(req.params.id);
    return res.json(await this.userService.update(uuid, updatedUserDto));
  };

  delete = (req: Request, res: Response) => {
    const uuid = validateUUID(req.params.id);
    return this.userService
      .delete(uuid)
      .then(deletedUser => res.json(deletedUser));
  };
}
