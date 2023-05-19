import {DatabaseType, DataSource} from "typeorm";
import path from "path";
import {EnvEnum} from "./common/enums/env/env.enum.js";
import { fileURLToPath } from 'url';

const {DB} = EnvEnum
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const entities = [__dirname + "/db/entities/**/*.entity.js"]
const migrations = [__dirname + "/db/migrations/**/*.js"]



const dataSource = new DataSource({
    type: DB.TYPE,
    host: DB.HOST,
    port: DB.PORT,
    username: DB.USERNAME,
    password: DB.PASSWORD,
    database: DB.DATABASE,
    logging: true,
    entities: entities,
    migrations: migrations,
    migrationsTableName: "migrations",
});




export {dataSource};



