import { userRouter } from "./user.router.js";
import { postRouter } from "./post.router.js";
import { Router } from "express";
import { apiValidationMiddleware } from "@validation/middleware/api-validation.middleware.js";
import { ApiRoutes } from "@enum/api/api-routes.js";

const apiRouter = Router();

apiRouter.use(ApiRoutes.USER, userRouter);
apiRouter.use(ApiRoutes.POST, postRouter);
apiRouter.use(apiValidationMiddleware);

export { apiRouter };
