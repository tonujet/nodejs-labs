import { Router } from "express";
import { userController } from "@controller/index.js";
import { UserRoutes } from "@enum/user/user-routes.js";

const userRouter = Router();
userRouter.get(UserRoutes.GET_WITH_POST, userController.getWithPosts);
userRouter.get(UserRoutes.GET_ALL_WITH_POST, userController.getAllWithPosts);
userRouter.get(UserRoutes.GET, userController.get);
userRouter.get(UserRoutes.GET_ALL, userController.getAll);
userRouter.delete(UserRoutes.DELETE, userController.delete);
userRouter.post(UserRoutes.CREATE, userController.create);
userRouter.patch(UserRoutes.UPDATE, userController.update);
export { userRouter };
