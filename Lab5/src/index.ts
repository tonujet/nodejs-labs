import express, {Request, Response, Express} from "express"
import {config} from "dotenv"
config()

const app: Express = express()
const PORT = process.env.PORT || 5000


app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(PORT, () => {
    console.log("Server was started");
})


