import {Router} from "express";
import {userRouter} from "./user.routes";


const apiRouter: Router = Router();
apiRouter.use("/users", userRouter);
export default apiRouter;