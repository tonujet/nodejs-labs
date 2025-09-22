import "reflect-metadata";
import { dataSource } from "./typeorm.config.js";
import express from "express";
import { EnvEnum } from "@enum/env/env.enum.js";
import { apiRouter } from "./routers/api.router.js";
import { notFoundMiddleware } from "@validation/middleware/not-found.middleware.js";

const app = express();
app.use(express.json());
app.use("/api", apiRouter);
app.use(notFoundMiddleware);

await dataSource
  .initialize()
  .then(() => console.log("Connected to db"))
  .catch(err => console.log(err));

app.listen(EnvEnum.SERVER.PORT, () => {
  console.log(`Server started on PORT:  ${EnvEnum.SERVER.PORT}`);
});
