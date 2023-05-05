"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
// - зробіть ендпоінт "створення користувача" з
// обов'язковим параметром username і необов'язковим параметром name;
// - зробіть ендпоінт "отримання даних користувача за його id" (id + username + name); +
// - зробіть ендпоінт "список користувачів" (список записів id + username + name); +
// - зробіть ендпоінт "оновлення даних користувача за його id";
// - зробіть ендпоінт "видалення користувача за його id"; +
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.get("/:id");
userRouter.get("/");
userRouter.delete("/:id");
userRouter.patch("/:id");
userRouter.post("/");
