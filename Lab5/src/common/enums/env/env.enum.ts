import {config} from 'dotenv';


config();

const PORT = process.env.PORT || 3000

const ENV = {
    APP: {
        PORT
    }
}

export { ENV }