import express, {Request, Response, Express} from "express";
import {ENV} from "./common/enums/env/env.enum";
import {apiRouter} from "./routes/routes";
import {ApiRoutes} from "./common/enums/api/api-routes.enum";
import 'reflect-metadata';

const app: Express = express();
const PORT = ENV.APP.PORT;


app.use(express.json());
app.use(ApiRoutes.API, apiRouter);

app.listen(PORT, () => {
    console.log("Server was started | PORT = ", PORT);
});




