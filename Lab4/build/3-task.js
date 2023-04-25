"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = __importDefault(require("process"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const https_1 = __importDefault(require("https"));
const FILE_PATH_SCRIPT_INDEX = 2;
const filePath = process_1.default.argv[FILE_PATH_SCRIPT_INDEX];
const getHTMLpages = (filePath) => {
    fs_1.default.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
        if (err)
            throw err;
        const parsedFilePath = path_1.default.parse(filePath);
        const folderPath = path_1.default.join(parsedFilePath.dir, parsedFilePath.name);
        fs_1.default.mkdir(folderPath, { recursive: true }, (err) => {
            if (err)
                throw err;
            const urls = JSON.parse(data);
            for (const url of urls) {
                const onGetRequest = (res) => writeToFile(res, url, folderPath);
                https_1.default.get(url, onGetRequest);
            }
        });
    });
};
const writeToFile = (res, url, folderPath) => {
    const fileName = `${url.replace(/[^\w\s]/gi, '')}.txt`;
    const htmlFilePath = path_1.default.join(folderPath, fileName);
    const fileStream = fs_1.default.createWriteStream(htmlFilePath);
    res.on('data', chunk => {
        fileStream.write(chunk, (err) => {
            if (err)
                throw err;
        });
    });
    res.on("error", (err) => {
        if (err)
            throw err;
    });
};
process_1.default.setUncaughtExceptionCaptureCallback((err) => {
    console.log(err);
});
getHTMLpages(filePath);
