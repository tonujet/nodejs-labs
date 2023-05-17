import {UserService} from "../../services/services.js";
import {Request, Response, NextFunction} from "express";
import {validateOrReject} from "class-validator";
import {plainToInstance} from "class-transformer";
import {UserEntity} from "../../entity/user/user.entity.js";
import {UserProperties} from "../../common/types/user/user.properties.js";
import {UserValidator} from "../../entity/user/user-validator.js";

class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly userValidator: UserValidator
    ){}

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            this.userValidator.isIdValid(id);
            const user = await this.userService.get(id);
            res.json(user);
        } catch (e) {
            next(e);
        }
    };

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.getAll();
            res.json(users);
        } catch (e) {
            next(e);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userJson = req.body;
            this.userValidator.isIdUndefined(userJson.id);
            const user = plainToInstance(UserEntity, userJson);
            await validateOrReject(user, {
                whitelist: true,
                forbidUnknownValues: true
            });
            const createdUser = await this.userService.create(user);
            res.json(createdUser);
        } catch (e) {
            next(e);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            this.userValidator.isIdValid(id);
            const deletedUser = await this.userService.delete(id);
            res.json(deletedUser);
        } catch (e) {
            next(e);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            this.userValidator.isIdValid(id);

            const propertiesJson = req.body;
            this.userValidator.isIdUndefined(propertiesJson.id);

            const props = plainToInstance(UserEntity, propertiesJson);
            await validateOrReject(props, {
                skipMissingProperties: true,
                forbidUnknownValues: true,
                whitelist: true
            });
            const updatedUser = await this.userService.update(props as UserProperties, id);
            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    };
}


export {UserController};