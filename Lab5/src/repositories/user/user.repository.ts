import fsp from "fs/promises";
import {UserEntity} from "../../entity/user/user.entity.js";
import {CsvParser} from "../../db/parsers/csvParser.js";
import {OptionParser} from "../../db/parsers/optionParser.js";
import {UserProperties} from "../../common/types/user/user.properties.js";
import {UserValidator} from "../../entity/user/user-validator.js";

class UserRepository {
    private currId: number;
    private readonly header: string;

    constructor(
        private readonly storagePath: string,
        private readonly optionsPath: string,
        private readonly csvParser: CsvParser,
        private readonly optionParser: OptionParser,
        private readonly keys: (keyof UserEntity)[],
        private readonly userValidator: UserValidator
    ) {
        this.header = keys.join(",");
    }


    async get(id: number) {
        const users = await this.getAll();
        const receivedUser = users.find(user => user.id === id);
        this.userValidator.isExist(receivedUser, id);
        return receivedUser!;
    };

    async getAll() {
        const header = this.header;
        const data = await fsp.readFile(this.storagePath, {encoding: "utf-8"});
        return this.csvParser.parseEntities(header, data, this.keys);
    };

    async create(user: UserEntity) {
        const createdUser = {id: this.currId++, ...user};
        const csvLine = this.csvParser.entityToCsvRaw(createdUser);
        await fsp.appendFile(this.storagePath, `\n${csvLine}`, {encoding: "utf-8"});
        return createdUser;
    };


    async delete(id: number) {
        const deletedUser = await this.get(id);
        const users = await this.getAll();
        const updatedUsers = users.filter(user => user.id !== id);
        await this.save(updatedUsers);
        return deletedUser;
    };


    async update(properties: UserProperties, id: number) {
        const users = await this.getAll();
        let updatedUser = null;
        const updatedUsers = users.map(user => {
            if (user.id === id) {
                Object.keys(properties).forEach(key => {
                    (user as UserProperties)[key as keyof UserEntity] =
                        properties[key as keyof UserProperties];
                });
                updatedUser = user;
            }
            return user;
        });
        const user = this.userValidator.isExist(updatedUser, id);
        await this.save(updatedUsers);
        return user;
    };

    private async save(users: UserEntity[]) {
        let csvRaws= this.csvParser.arrayToCsvRaws(users);
        if (csvRaws) csvRaws = `${this.header}\n${csvRaws}`;
        else csvRaws = `${this.header}`;
        await fsp.writeFile(this.storagePath, csvRaws, {encoding: "utf-8"});
    }

    async logOptions() {
        const options = {currId: String(this.currId)};
        const rawOptions = this.optionParser.convertToOptions(options);
        await fsp.writeFile(this.optionsPath, rawOptions);
        this.currId = Number(options.currId);
    }

    async readOptions() {
        const rawOptions = await fsp.readFile(this.optionsPath, {encoding: "utf-8"});
        const options = this.optionParser.parseOptions(rawOptions);
        this.currId = Number(options.currId);
    }
}

export {UserRepository};