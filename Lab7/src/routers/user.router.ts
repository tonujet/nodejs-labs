import { Router } from "express";
import { userController } from "@controller/index.js";

const userRouter = Router();
userRouter.get("/:id", userController.get);
userRouter.get("/", userController.getAll);
userRouter.delete("/:id", userController.delete);
userRouter.post("/", userController.create);
userRouter.patch("/:id", userController.update);

export { userRouter };
