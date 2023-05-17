import express from "express";
import { ENV } from "./common/enums/env/env.enum.js";
import { apiRouter } from "./routes/routes.js";
import { ApiRoutes } from "./common/enums/api/api-routes.enum.js";
import 'reflect-metadata';
import { pageNotFoundValidationMiddleware } from "./middleware/validators/page-not-found-validation.middleware.js";
const app = express();
const PORT = ENV.APP.PORT;
app.use(express.json());
app.use(ApiRoutes.API, apiRouter);
app.use(pageNotFoundValidationMiddleware);
app.listen(PORT, () => {
    console.log("Server was started | PORT = ", PORT);
});
