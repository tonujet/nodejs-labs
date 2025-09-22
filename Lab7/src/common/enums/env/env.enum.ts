import { config } from "dotenv";

config();

const EnvEnum = {
  DB: {
    TYPE: process.env.DB_TYPE as "postgres" | "mysql",
    HOST: process.env.DB_HOST,
    PORT: Number(process.env.DB_PORT),
    USERNAME: process.env.DB_USERNAME,
    DATABASE: process.env.DB_DATABASE,
    PASSWORD: process.env.DB_PASSWORD,
  },
  SERVER: {
    PORT: process.env.SERVER_PORT,
  },
};

export { EnvEnum };
