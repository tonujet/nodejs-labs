"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_enum_1 = require("./common/enums/env/env.enum");
const routes_1 = require("./routes/routes");
const api_routes_enum_1 = require("./common/enums/api/api-routes.enum");
require("reflect-metadata");
const page_not_found_validation_middleware_1 = require("./middleware/validators/page-not-found-validation.middleware");
const app = (0, express_1.default)();
const PORT = env_enum_1.ENV.APP.PORT;
app.use(express_1.default.json());
app.use(api_routes_enum_1.ApiRoutes.API, routes_1.apiRouter);
app.use(page_not_found_validation_middleware_1.pageNotFoundValidationMiddleware);
app.listen(PORT, () => {
    console.log("Server was started | PORT = ", PORT);
});
