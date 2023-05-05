import {Router} from "express";
import {userRouter} from "./user.routes";
import {ApiRoutes} from "../common/enums/api/api-routes.enum";

const apiRouter: Router = Router();
apiRouter.use(ApiRoutes.USERS, userRouter);
export {apiRouter};