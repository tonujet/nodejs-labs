"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const user_entity_1 = require("../../entity/user/user.entity");
class UserController {
    constructor(userService, userValidator) {
        this.get = async (req, res, next) => {
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
        this.getAll = async (req, res, next) => {
            try {
                const users = await this.userService.getAll();
                res.json(users);
            }
            catch (e) {
                next(e);
            }
        };
        this.create = async (req, res, next) => {
            try {
                const userJson = req.body;
                this.userValidator.isIdUndefined(userJson.id);
                const user = (0, class_transformer_1.plainToInstance)(user_entity_1.UserEntity, userJson);
                await (0, class_validator_1.validateOrReject)(user, { whitelist: true, forbidUnknownValues: true });
                const createdUser = await this.userService.create(user);
                res.json(createdUser);
            }
            catch (e) {
                next(e);
            }
        };
        this.delete = async (req, res, next) => {
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
        this.update = async (req, res, next) => {
            try {
                const id = Number(req.params.id);
                this.userValidator.isIdValid(id);
                const propertiesJson = req.body;
                this.userValidator.isIdUndefined(propertiesJson.id);
                const props = (0, class_transformer_1.plainToInstance)(user_entity_1.UserEntity, propertiesJson);
                await (0, class_validator_1.validateOrReject)(props, {
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
        this.userService = userService;
        this.userValidator = userValidator;
    }
}
exports.UserController = UserController;
