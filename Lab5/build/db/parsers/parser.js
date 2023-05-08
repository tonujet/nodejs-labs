"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionParser = exports.csvParser = void 0;
const csvParser_1 = require("./csvParser");
const optionParser_1 = require("./optionParser");
const csvParser = new csvParser_1.CsvParser();
exports.csvParser = csvParser;
const optionParser = new optionParser_1.OptionParser();
exports.optionParser = optionParser;
