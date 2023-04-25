// 3. Напишіть скрипт, який отримує з командного рядка рядковий параметр - шлях до JSON-файла із масивом рядків
// - посилань, читає та аналізує його вміст. Скрипт має створити папку «<JSON_filename>_pages»
// і для кожного посилання із <JSON-файла отримати його HTML-вміст і зберегти цей вміст у окремому файлі
// в новоствореній папці.
// Приклад JSON-файла (list.json) прикріплений до цього практичного завдання нижче.

import process from "process";
import fs from "fs";
import path, {ParsedPath} from "path";
import https from "https";
import {IncomingMessage} from "http";

const FILE_PATH_SCRIPT_INDEX: number = 2;
const filePath: string = process.argv[FILE_PATH_SCRIPT_INDEX];


// Код написаний на колбеках, а не на промісах, бо я хотів попрактикуватися в використанні колбеків
const getHTMLpages = (filePath: string) => {
    fs.readFile(filePath, {encoding: "utf-8"}, (err, data) => {
        if (err) throw err;
        const parsedFilePath: ParsedPath = path.parse(filePath);
        const folderPath: string = path.join(parsedFilePath.dir, parsedFilePath.name);
        fs.mkdir(folderPath, {recursive: true}, (err) => {
            if (err) throw err;
            const urls: string[] = JSON.parse(data);
            for (const url of urls) {
                const onGetRequest = (res: IncomingMessage) => writeToFile(res, url, folderPath);
                https.get(url, onGetRequest);
            }
        });

    });
};

const writeToFile = (res: IncomingMessage, url: string, folderPath: string) => {
    const fileName: string = `${url.replace(/[^\w\s]/gi, '')}.txt`;
    const htmlFilePath: string = path.join(folderPath, fileName);
    const fileStream = fs.createWriteStream(htmlFilePath);
    res.on('data', chunk => {
        fileStream.write(chunk, (err) => {
            if (err) throw err;
        });
    });
    res.on("error", (err) => {
        if (err) throw err;
    });
};

process.setUncaughtExceptionCaptureCallback((err) => {
    console.log(err);
});

getHTMLpages(filePath);

