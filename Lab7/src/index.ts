import "reflect-metadata"
import {dataSource} from "./typeorm.config.js";


dataSource
    .initialize()
    .then(() => console.log("Connected to db"))
    .catch(err => console.log(err));


