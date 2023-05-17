class OptionParser {
    parseOptions(rawData) {
        const options = {};
        const lines = rawData.split("\n");
        const equalIndexes = lines.map(line => line.indexOf("="));
        for (const [i, line] of lines.entries()) {
            const key = line.slice(0, equalIndexes[i]);
            options[key] = line.slice(++equalIndexes[i]);
        }
        return options;
    }
    convertToOptions(options) {
        let rawData = "";
        let counter = 0;
        const entries = Object.entries(options);
        const propertyLength = entries.length;
        for (const [key, value] of entries) {
            let line;
            if (counter !== propertyLength - 1) {
                line = `${key}=${value}\n`;
            }
            else {
                line = `${key}=${value}`;
            }
            rawData += line;
            counter++;
        }
        return rawData;
    }
}
export { OptionParser };
