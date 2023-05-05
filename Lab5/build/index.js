"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_enum_1 = require("./common/enums/env/env.enum");
const app = (0, express_1.default)();
const PORT = env_enum_1.ENV.APP.PORT;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(PORT, () => {
    console.log("Server was started | PORT = ", PORT);
});
