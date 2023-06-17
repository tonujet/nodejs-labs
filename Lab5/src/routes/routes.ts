import { Router } from "express";
import { userRouter } from "./user/user.routes.js";
import { ApiRoutes } from "@enums/api/api-routes.enum.js";
import { clientValidationMiddleware } from "@middleware/validators/client-validation.middleware.js";

const apiRouter = Router();
apiRouter.use(ApiRoutes.USERS, userRouter);
apiRouter.use(clientValidationMiddleware);
export { apiRouter };
