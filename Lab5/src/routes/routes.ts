import {Router} from "express";
import {userRouter} from "./user/user.routes";
import {ApiRoutes} from "../common/enums/api/api-routes.enum";
import {finalValidationMiddleware} from "../middleware/validators/final-validation.middleware";

const apiRouter: Router = Router();
apiRouter.use(ApiRoutes.USERS, userRouter);
apiRouter.use(finalValidationMiddleware);
export {apiRouter};