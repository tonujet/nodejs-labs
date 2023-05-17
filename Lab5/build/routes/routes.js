import { Router } from "express";
import { userRouter } from "./user/user.routes.js";
import { ApiRoutes } from "../common/enums/api/api-routes.enum.js";
import { finalValidationMiddleware } from "../middleware/validators/final-validation.middleware.js";
const apiRouter = Router();
apiRouter.use(ApiRoutes.USERS, userRouter);
apiRouter.use(finalValidationMiddleware);
export { apiRouter };
