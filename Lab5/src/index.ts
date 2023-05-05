import express, {Request, Response, Express} from "express"
import {ENV} from "./common/enums/env/env.enum";

const app: Express = express()
const PORT = ENV.APP.PORT


app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(PORT, () => {
    console.log("Server was started | PORT = ", PORT);
})


