import {config} from 'dotenv';


config();

const PORT = Number(process.env.PORT) || 3000;
const OPTIONS_PATH = process.env.OPTIONS_PATH || "./options" ;
const STORAGE_PATH = process.env.STORAGE_PATH || "./user.csv";

const ENV = {
    APP: {
        PORT
    },
    USER: {
      OPTIONS_PATH,
      STORAGE_PATH,
    }
};

export {ENV};