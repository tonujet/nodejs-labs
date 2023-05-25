import { Router } from "express";
import { postController } from "@controller/index.js";

const postRouter = Router();
postRouter.get("/:id", postController.get);
postRouter.get("/", postController.getAll);
postRouter.delete("/:id", postController.delete);
postRouter.post("/", postController.create);
postRouter.patch("/:id", postController.update);

export { postRouter };
