"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const PORT = process.env.PORT || 3000;
const ENV = {
    APP: {
        PORT
    }
};
exports.ENV = ENV;
