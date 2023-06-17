import { Router } from "express";
import { postController } from "@controller/index.js";
import { PostRoutes } from "@enum/post/post-routes.js";

const postRouter = Router();
postRouter.get(PostRoutes.GET, postController.get);
postRouter.get(PostRoutes.GET_ALL, postController.getAll);
postRouter.delete(PostRoutes.DELETE, postController.delete);
postRouter.post(PostRoutes.CREATE, postController.create);
postRouter.patch(PostRoutes.UPDATE, postController.update);
export { postRouter };
