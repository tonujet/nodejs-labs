class CsvParser {

    parseRaws(csvRaws: string) {
        return csvRaws.split("\n");
    };

    parseRaw(csvRaw: string) {
        return csvRaw.split(",");
    };


    parseEntities<T>(header: string, data: string, keys: (keyof T)[]) {
        const csvRaws = this.parseRaws(data);
        csvRaws.shift();
        const entities: T[] = [];
        for (const csvRaw of csvRaws) {
            const entity = this.parseEntity(csvRaw, keys);
            entities.push(entity);
        }
        return entities;
    }

    parseEntity<T>(csvRaw: string, keys: (keyof T)[]) {
        const entity = {} as T;
        const entityValues = this.parseRaw(csvRaw)
        for (const [i, key] of keys.entries()) {
            const value = entityValues[i];
            entity[key] = JSON.parse(value);
        }
        return entity;
    }

    arrayToCsvRaws<T>(objects: T[]) {
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


    entityToCsvRaw<T>(entity: T) {
        const values = Object.values(entity as Record<string, unknown>);
        const typedValues = values.map(value => JSON.stringify(value));
        return typedValues.join(",");
    }
}


export {CsvParser};