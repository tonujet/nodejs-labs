import { UserService } from "@service/index.js";
import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { CreateUserDto } from "@dto/user/create-user.dto.js";
import { GetAllUserQueryType } from "@type/user/get-all-user-query.type.js";
import { UserValidator } from "@validation/general/user.validator.js";
import { GeneralValidator } from "@validation/general/general.validator.js";

export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userValidator: UserValidator,
    private readonly generalValidator: GeneralValidator
  ) {}

  get = (req: Request, res: Response) => {
    const uuid = this.generalValidator.validateUUID(req.params.id);
    return this.userService.get(uuid).then(user => res.json(user));
  };

  getWithPosts = (req: Request, res: Response) => {
    const uuid = this.generalValidator.validateUUID(req.params.id);
    return this.userService.getWithPosts(uuid).then(user => res.json(user));
  };

  getAll = async (req: Request, res: Response) => {
    const query = plainToInstance(GetAllUserQueryType, req.query);
    await this.userValidator.validateGetAllQuery(query);
    this.userValidator.isUserPostTitleUndefined(query);
    return this.userService.getAll(query).then(users => res.json(users));
  };

  getAllWithPosts = async (req: Request, res: Response) => {
    const query = plainToInstance(GetAllUserQueryType, req.query);
    await this.userValidator.validateGetAllQuery(query);
    return this.userService
      .getAllWithPosts(query)
      .then(users => res.json(users));
  };

  create = async (req: Request, res: Response) => {
    const createUserDto = plainToInstance(CreateUserDto, req.body);
    await this.userValidator.validateCreateDto(createUserDto);
    return res.json(await this.userService.create(createUserDto));
  };

  update = async (req: Request, res: Response) => {
    const updatedUserDto = plainToInstance(CreateUserDto, req.body);
    await this.userValidator.validateUpdateDto(updatedUserDto);
    const uuid = this.generalValidator.validateUUID(req.params.id);
    return res.json(await this.userService.update(uuid, updatedUserDto));
  };

  delete = (req: Request, res: Response) => {
    const uuid = this.generalValidator.validateUUID(req.params.id);
    return this.userService
      .delete(uuid)
      .then(deletedUser => res.json(deletedUser));
  };
}
