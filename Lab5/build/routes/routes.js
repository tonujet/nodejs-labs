"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = require("./user.routes");
const apiRouter = (0, express_1.Router)();
apiRouter.use("/users", user_routes_1.userRouter);
exports.default = apiRouter;
