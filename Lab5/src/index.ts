import express, {Request, Response, Express} from "express";
import {ENV} from "./common/enums/env/env.enum";
import {apiRouter} from "./routes/routes";
import {ApiRoutes} from "./common/enums/api/api-routes.enum";
import 'reflect-metadata';
import {pageNotFoundValidationMiddleware} from "./middleware/validators/page-not-found-validation.middleware";

const app: Express = express();
const PORT: number = ENV.APP.PORT;


app.use(express.json());
app.use(ApiRoutes.API, apiRouter);
app.use(pageNotFoundValidationMiddleware)

app.listen(PORT, () => {
    console.log("Server was started | PORT = ", PORT);
});




