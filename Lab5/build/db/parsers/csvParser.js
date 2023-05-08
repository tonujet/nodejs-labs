"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvParser = void 0;
class CsvParser {
    parseRaws(csvRaws) {
        return csvRaws.split("\n");
    }
    ;
    parseRaw(csvRaw) {
        return csvRaw.split(",");
    }
    ;
    parseEntities(header, data, keys) {
        const csvRaws = this.parseRaws(data);
        csvRaws.shift();
        const entities = [];
        for (const csvRaw of csvRaws) {
            const entity = this.parseEntity(csvRaw, keys);
            entities.push(entity);
        }
        return entities;
    }
    parseEntity(csvRaw, keys) {
        const entity = {};
        const entityValues = this.parseRaw(csvRaw);
        for (const [i, key] of keys.entries()) {
            const value = entityValues[i];
            entity[key] = JSON.parse(value);
        }
        return entity;
    }
    arrayToCsvRaws(objects) {
        let csvString = "";
        for (const [i, object] of objects.entries()) {
            let line = this.entityToCsvRaw(object);
            if (i !== objects.length - 1) {
                line += "\n";
            }
            csvString += line;
        }
        return csvString;
    }
    entityToCsvRaw(entity) {
        const values = Object.values(entity);
        const typedValues = values.map(value => JSON.stringify(value));
        return typedValues.join(",");
    }
}
exports.CsvParser = CsvParser;
