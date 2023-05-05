import express, {Request, Response, Express} from "express"
import {ENV} from "./common/enums/env/env.enum";
import {apiRouter} from "./routes/routes"
import {ApiRoutes} from "./common/enums/api/api-routes.enum";

const app: Express = express()
const PORT = ENV.APP.PORT


app.use(ApiRoutes.API, apiRouter)

app.listen(PORT, () => {
    console.log("Server was started | PORT = ", PORT);
})


