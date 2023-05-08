class CsvParser {

    parseRaws(csvRaws: string): string[] {
        return csvRaws.split("\n");
    };

    parseRaw(csvRaw: string): string[] {
        return csvRaw.split(",");
    };


    parseEntities<T>(header: string, data: string, keys: (keyof T)[]): T[] {
        const csvRaws: string[] = this.parseRaws(data);
        csvRaws.shift();
        const entities: T[] = [];
        for (const csvRaw of csvRaws) {
            const entity: T = this.parseEntity(csvRaw, keys);
            entities.push(entity);
        }
        return entities;
    }

    parseEntity<T>(csvRaw: string, keys: (keyof T)[]): T {
        const entity: T = {} as T;
        const entityValues: string[] = this.parseRaw(csvRaw)
        for (const [i, key] of keys.entries()) {
            const value: string = entityValues[i];
            entity[key] = JSON.parse(value);
        }
        return entity;
    }

    arrayToCsvRaws<T>(objects: T[]): string {
        let csvString: string = "";
        for (const [i, object] of objects.entries()) {
            let line = this.entityToCsvRaw(object);
            if (i !== objects.length - 1) {
                line += "\n";
            }
            csvString += line;
        }
        return csvString;
    }


    entityToCsvRaw<T>(entity: T): string {
        const values = Object.values(entity as Record<string, unknown>);
        const typedValues: string[] = values.map(value => JSON.stringify(value));
        return typedValues.join(",");
    }
}


export {CsvParser};