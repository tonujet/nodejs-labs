import "reflect-metadata";
import { dataSource } from "./typeorm.config.js";
import express from "express";
import { EnvEnum } from "./common/enums/env/env.enum.js";
import { apiRouter } from "./routers/api.router.js";

const app = express();
app.use(express.json());
app.use("/api", apiRouter);

await dataSource
  .initialize()
  .then(() => console.log("Connected to db"))
  .catch(err => console.log(err));

app.listen(EnvEnum.SERVER.PORT, () => {
  console.log(`Server started on PORT:  ${EnvEnum.SERVER.PORT}`);
});
