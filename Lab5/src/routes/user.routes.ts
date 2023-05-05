import {Router} from "express"
import {userController} from "../controllers/user.controller";


const userRouter: Router = Router();
userRouter.get("/:id", userController.get);
userRouter.get("/", userController.getAll);
userRouter.delete("/:id", userController.delete)
userRouter.patch("/:id", userController.update)
userRouter.post("/", userController.create)


export {userRouter}

