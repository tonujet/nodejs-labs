import {Router} from "express"
import {userController} from "../../controllers/controllers.js";
import {UserRoutes} from "../../common/enums/user/user-routes.enum.js";

const userRouter: Router = Router();
userRouter.get(UserRoutes.GET, userController.get);
userRouter.get(UserRoutes.GET_ALL, userController.getAll);
userRouter.delete(UserRoutes.DELETE, userController.delete)
userRouter.patch(UserRoutes.UPDATE, userController.update)
userRouter.post(UserRoutes.CREATE, userController.create)


export {userRouter}

