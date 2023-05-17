import fsp from "fs/promises";
import {UserEntity} from "../../entity/user/user.entity.js";
import {CsvParser} from "../../db/parsers/csvParser.js";
import {OptionParser} from "../../db/parsers/optionParser.js";
import {UserDbEnum} from "../../common/enums/user/user-db.enum.js";
import {Options} from "../../common/types/option/options.type.js";
import {UserProperties} from "../../common/types/user/user.properties.js";
import {UserValidator} from "../../entity/user/user-validator.js";

class UserRepository {
    private currId: number;
    private readonly csvParser: CsvParser;
    private readonly optionParser: OptionParser;
    private readonly storagePath: string;
    private readonly optionsPath: string;
    private readonly keys: (keyof UserEntity)[];
    private readonly header: string;
    private readonly userValidator: UserValidator;


    constructor(
        storagePath: string,
        optionsPath: string,
        csvParser: CsvParser,
        optionParser: OptionParser,
        keys: (keyof UserEntity)[],
        userValidator: UserValidator
    ) {
        this.storagePath = storagePath;
        this.optionsPath = optionsPath;
        this.csvParser = csvParser;
        this.optionParser = optionParser;
        this.keys = keys;
        this.header = keys.join(",");
        this.userValidator = userValidator;
    }


    async get(id: number): Promise<UserEntity> | never {
        const users: UserEntity[] = await this.getAll();
        const receivedUser: UserEntity | undefined = users.find(user => user.id === id);
        this.userValidator.isExist(receivedUser, id);
        return receivedUser!;
    };

    async getAll(): Promise<UserEntity[]> | never {
        const header: string = this.header;
        const data: string = await fsp.readFile(UserDbEnum.storage, {encoding: "utf-8"});
        return this.csvParser.parseEntities(header, data, this.keys);
    };

    async create(user: UserEntity): Promise<UserEntity> | never {
        const createdUser: UserEntity = {id: this.currId++, ...user};
        const csvLine: string = this.csvParser.entityToCsvRaw(createdUser);
        await fsp.appendFile(this.storagePath, `\n${csvLine}`, {encoding: "utf-8"});
        return createdUser;
    };


    async delete(id: number): Promise<UserEntity> | never {
        const deletedUser = await this.get(id);
        const users: UserEntity[] = await this.getAll();
        const updatedUsers: UserEntity[] = users.filter(user => user.id !== id);
        await this.save(updatedUsers);
        return deletedUser!;
    };


    async update(properties: UserProperties, id: number): Promise<UserEntity> {
        const users: UserEntity[] = await this.getAll();
        let updatedUser: UserEntity | null = null;
        const updatedUsers: UserEntity[] = users.map(user => {
            if (user.id === id) {
                Object.keys(properties).forEach(key => {
                    (user as UserProperties)[key as keyof UserEntity] =
                        properties[key as keyof UserProperties];
                });
                updatedUser = user;
            }
            return user;
        });
        const user: UserEntity = this.userValidator.isExist(updatedUser, id);
        await this.save(updatedUsers);
        return user;
    };

    private async save(users: UserEntity[]): Promise<void> {
        let csvRaws: string = this.csvParser.arrayToCsvRaws(users);
        if (csvRaws) csvRaws = `${this.header}\n${csvRaws}`;
        else csvRaws = `${this.header}`;
        await fsp.writeFile(this.storagePath, csvRaws, {encoding: "utf-8"});
    }

    async logOptions(): Promise<void> {
        const options: Options = {currId: String(this.currId)};
        const rawOptions = this.optionParser.convertToOptions(options);
        await fsp.writeFile(this.optionsPath, rawOptions);
        this.currId = Number(options.currId);
    }

    async readOptions(): Promise<void> {
        const rawOptions: string = await fsp.readFile(this.optionsPath, {encoding: "utf-8"});
        const options: Options = this.optionParser.parseOptions(rawOptions);
        this.currId = Number(options.currId);
    }
}

export {UserRepository};