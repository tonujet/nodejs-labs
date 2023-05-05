"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const user_routes_1 = require("./user.routes");
const api_routes_enum_1 = require("../common/enums/api/api-routes.enum");
const apiRouter = (0, express_1.Router)();
exports.apiRouter = apiRouter;
apiRouter.use(api_routes_enum_1.ApiRoutes.USERS, user_routes_1.userRouter);
