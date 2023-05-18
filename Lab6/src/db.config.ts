import pg from "pg"
import dotenv from "dotenv"
dotenv.config()

const client = new pg.Client({
    host: process.env.HOST,
    port: +(process.env.PORT || 3000),
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
});

// auto parse 64bit integer string to number
pg.types.setTypeParser(20, parseInt)




await client
    .connect()
    .then(() => console.log('connected '))
    .catch((err) => console.error('connection error', err))

export {client as dbConnection}