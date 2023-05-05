import {Router} from "express"

// - зробіть ендпоінт "створення користувача" з
// обов'язковим параметром username і необов'язковим параметром name;
// - зробіть ендпоінт "отримання даних користувача за його id" (id + username + name); +
// - зробіть ендпоінт "список користувачів" (список записів id + username + name); +
// - зробіть ендпоінт "оновлення даних користувача за його id";
// - зробіть ендпоінт "видалення користувача за його id"; +

const userRouter: Router = Router();
userRouter.get("/:id");
userRouter.get("/");
userRouter.delete("/:id")
userRouter.patch("/:id")
userRouter.post("/")


export {userRouter}

