import { userRouter } from "./user.router.js";
import { postRouter } from "./post.router.js";
import { Router } from "express";
import { apiValidationMiddleware } from "@validation/middleware/api-validation.middleware.js";

const apiRouter = Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/posts", postRouter);
apiRouter.use(apiValidationMiddleware);

export { apiRouter };
