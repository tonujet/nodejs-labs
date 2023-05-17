import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import { UserEntity } from "../../entity/user/user.entity.js";
class UserController {
    userService;
    userValidator;
    constructor(userService, userValidator) {
        this.userService = userService;
        this.userValidator = userValidator;
    }
    get = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            this.userValidator.isIdValid(id);
            const user = await this.userService.get(id);
            res.json(user);
        }
        catch (e) {
            next(e);
        }
    };
    getAll = async (req, res, next) => {
        try {
            const users = await this.userService.getAll();
            res.json(users);
        }
        catch (e) {
            next(e);
        }
    };
    create = async (req, res, next) => {
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
        }
        catch (e) {
            next(e);
        }
    };
    delete = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            this.userValidator.isIdValid(id);
            const deletedUser = await this.userService.delete(id);
            res.json(deletedUser);
        }
        catch (e) {
            next(e);
        }
    };
    update = async (req, res, next) => {
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
            const updatedUser = await this.userService.update(props, id);
            res.json(updatedUser);
        }
        catch (e) {
            next(e);
        }
    };
}
export { UserController };
