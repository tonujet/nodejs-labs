"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const user_db_enum_1 = require("../../common/enums/user/user-db.enum");
class UserRepository {
    constructor(storagePath, optionsPath, csvParser, optionParser, keys, userValidator) {
        this.storagePath = storagePath;
        this.optionsPath = optionsPath;
        this.csvParser = csvParser;
        this.optionParser = optionParser;
        this.keys = keys;
        this.header = keys.join(",");
        this.userValidator = userValidator;
    }
    async get(id) {
        const users = await this.getAll();
        const receivedUser = users.find(user => user.id = id);
        this.userValidator.isExist(receivedUser, id);
        return receivedUser;
    }
    ;
    async getAll() {
        const header = this.header;
        const data = await promises_1.default.readFile(user_db_enum_1.UserDbEnum.storage, { encoding: "utf-8" });
        return this.csvParser.parseEntities(header, data, this.keys);
    }
    ;
    async create(user) {
        const createdUser = { id: ++this.currId, ...user };
        const csvLine = this.csvParser.entityToCsvRaw(createdUser);
        await promises_1.default.appendFile(this.storagePath, `\n${csvLine}`, { encoding: "utf-8" });
        return createdUser;
    }
    ;
    async delete(id) {
        const deletedUser = await this.get(id);
        const users = await this.getAll();
        const updatedUsers = users.filter(user => user.id !== id);
        await this.save(updatedUsers);
        return deletedUser;
    }
    ;
    async update(properties, id) {
        const users = await this.getAll();
        let updatedUser = null;
        const updatedUsers = users.map(user => {
            if (user.id === id) {
                Object.keys(properties).forEach(key => {
                    user[key] =
                        properties[key];
                });
                updatedUser = user;
            }
            return user;
        });
        const user = this.userValidator.isExist(updatedUser, id);
        await this.save(updatedUsers);
        return user;
    }
    ;
    async save(users) {
        let csvRaws = this.csvParser.arrayToCsvRaws(users);
        if (csvRaws)
            csvRaws = `${this.header}\n${csvRaws}`;
        else
            csvRaws = `${this.header}`;
        await promises_1.default.writeFile(this.storagePath, csvRaws, { encoding: "utf-8" });
    }
    async logOptions() {
        const options = {
            currId: String(this.currId)
        };
        const rawOptions = this.optionParser.convertToOptions(options);
        await promises_1.default.writeFile(this.optionsPath, rawOptions);
        this.currId = Number(options.currId);
    }
    async readOptions() {
        const rawOptions = await promises_1.default.readFile(this.optionsPath, { encoding: "utf-8" });
        const options = this.optionParser.parseOptions(rawOptions);
        this.currId = Number(options.currId);
    }
}
exports.UserRepository = UserRepository;
