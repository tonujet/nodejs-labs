import pg from "pg";
import { EnvEnum } from "@enum/env/env.enum.js";

const { DB } = EnvEnum;

// connections = ((2 * core_count) + no_of_disks)
const pool = new pg.Pool({
  host: DB.HOST,
  port: +(DB.PORT || 3000),
  database: DB.NAME,
  user: DB.USER,
  password: DB.PASSWORD,
  max: +(DB.CONNECTIONS_NUMBER || 20),
  idleTimeoutMillis: +(DB.CONN_IDLE_TIMEOUT || 30000),
  connectionTimeoutMillis: +(DB.CONNECTION_TIMEOUT || 2000),
});

// auto parse 64bit integer string to number
pg.types.setTypeParser(20, parseInt);

export { pool as dbConnection };
