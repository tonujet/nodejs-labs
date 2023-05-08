"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.userController = void 0;
const services_1 = require("../services/services");
const user_controller_1 = require("./user/user.controller");
Object.defineProperty(exports, "UserController", { enumerable: true, get: function () { return user_controller_1.UserController; } });
const user_validator_1 = require("../entity/user/user-validator");
const userController = new user_controller_1.UserController(services_1.userService, user_validator_1.userValidator);
exports.userController = userController;
