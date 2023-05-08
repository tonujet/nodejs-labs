import {UserService} from "../../services/services";
import {Request, Response, NextFunction} from "express";
import {validateOrReject} from "class-validator";
import {plainToInstance} from "class-transformer";
import {UserEntity} from "../../entity/user/user.entity";
import {UserProperties} from "../../common/types/user/user.properties";
import {UserValidator} from "../../entity/user/user-validator";

class UserController {

    private readonly userService: UserService;
    private readonly userValidator: UserValidator;


    constructor(userService: UserService, userValidator: UserValidator) {
        this.userService = userService;
        this.userValidator = userValidator;
    }

    get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id: number = Number(req.params.id);
            this.userValidator.isIdValid(id);
            const user: UserEntity | undefined = await this.userService.get(id);
            res.json(user);
        } catch (e) {
            next(e);
        }
    };

    getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users: UserEntity[] = await this.userService.getAll();
            res.json(users);
        } catch (e) {
            next(e);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userJson = req.body;
            this.userValidator.isIdUndefined(userJson.id);
            const user: UserEntity = plainToInstance(UserEntity, userJson);
            await validateOrReject(user, {whitelist: true, forbidUnknownValues: true});
            const createdUser: UserEntity = await this.userService.create(user);
            res.json(createdUser);
        } catch (e) {
            next(e);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id: number = Number(req.params.id);
            this.userValidator.isIdValid(id);
            const deletedUser: UserEntity = await this.userService.delete(id);
            res.json(deletedUser);
        } catch (e) {
            next(e);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id: number = Number(req.params.id);
            this.userValidator.isIdValid(id);

            const propertiesJson = req.body;
            this.userValidator.isIdUndefined(propertiesJson.id);

            const props: UserEntity = plainToInstance(UserEntity, propertiesJson);
            await validateOrReject(props, {
                skipMissingProperties: true,
                forbidUnknownValues: true,
                whitelist: true
            });
            const updatedUser: UserEntity = await this.userService.update(props as UserProperties, id);
            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    };
}


export {UserController};