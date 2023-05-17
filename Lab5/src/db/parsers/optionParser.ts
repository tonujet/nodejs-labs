import type {Options} from "../../common/types/option/options.type.js";

class OptionParser {

    parseOptions(rawData: string) {
        const options: Options = {};
        const lines: string[] = rawData.split("\n");
        const equalIndexes: number[] = lines.map(line => line.indexOf("="));
        for (const [i, line] of lines.entries()) {
            const key: string = line.slice(0, equalIndexes[i]);
            options[key] = line.slice(++equalIndexes[i]);
        }
        return options;
    }

    convertToOptions(options: Options): string {
        let rawData: string = "";
        let counter: number = 0;
        const entries: [string, string][] = Object.entries(options);
        const propertyLength: number = entries.length;
        for (const [key, value] of entries) {
            let line;
            if (counter !== propertyLength - 1) {
                line = `${key}=${value}\n`;
            } else {
                line = `${key}=${value}`;
            }
            rawData += line;
            counter++;
        }

        return rawData;
    }
}

export {OptionParser};