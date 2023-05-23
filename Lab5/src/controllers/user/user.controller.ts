import {UserService} from "@services/services.js";
import {Request, Response} from "express";
import {validateOrReject} from "class-validator";
import {plainToInstance} from "class-transformer";
import {UserValidator} from "@entity/user/user-validator.js";
import {CreateUserDto} from "@dtos/user/create-user-dto.js";
import {
    updateValidationOptions,
    createValidationOptions
} from "@enums/validator/validator.js";

class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly userValidator: UserValidator
    ) {
    }

    get = (req: Request, res: Response) => {
        const id = this.userValidator.isIdValid(req.params.id);
        return this.userService.get(id).then(user => res.json(user));
    };

    getAll = (req: Request, res: Response) => {
        return this.userService.getAll().then(users => res.json(users));
    };

    create = async (req: Request, res: Response) => {
        const createUserDto = plainToInstance(CreateUserDto, req.body);
        await validateOrReject(createUserDto, createValidationOptions);
        res.json(await this.userService.create(createUserDto));
    };

    delete = (req: Request, res: Response) => {
        const id = this.userValidator.isIdValid(req.params.id);
        return this.userService.delete(id).then(deletedUser => res.json(deletedUser));
    };

    update = async (req: Request, res: Response) => {
        const id = this.userValidator.isIdValid(req.params.id);
        const userProps = plainToInstance(CreateUserDto, req.body);
        await validateOrReject(userProps, updateValidationOptions);
        res.json(await this.userService.update(userProps, id));
    };
}


export {UserController};