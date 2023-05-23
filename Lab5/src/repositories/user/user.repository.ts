import fsp from "fs/promises";
import { UserEntity } from "@entity/user/user.entity.js";
import { CsvParser } from "@db/parsers/csvParser.js";
import { OptionParser } from "@db/parsers/optionParser.js";
import { UserValidator } from "@entity/user/user-validator.js";
import { CreateUserDto } from "@dtos/user/create-user-dto.js";

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

    async get(id: number): Promise<UserEntity> {
        const users = await this.getAll();
        const receivedUser = users.find(user => user.id === id);
        this.userValidator.isExist(receivedUser, id);
        return receivedUser!;
    }

    getAll(): Promise<UserEntity[]> {
        return fsp
            .readFile(this.storagePath, { encoding: "utf-8" })
            .then(users =>
                this.csvParser.parseEntities(this.header, users, this.keys)
            );
    }

    create(user: CreateUserDto): Promise<UserEntity> {
        const createdUser = { id: this.currId++, ...user };
        const csvLine = this.csvParser.entityToCsvRaw(createdUser);
        return fsp
            .appendFile(this.storagePath, `\n${csvLine}`, { encoding: "utf-8" })
            .then(() => createdUser);
    }

    async delete(id: number): Promise<UserEntity> {
        const deletedUser = await this.get(id);
        const users = await this.getAll();
        const updatedUsers = users.filter(user => user.id !== id);
        await this.save(updatedUsers);
        return deletedUser;
    }

    async update(userProps: CreateUserDto, id: number): Promise<UserEntity> {
        const users = await this.getAll();
        let updatedUser = null;
        const updatedUsers = users.map(user => {
            if (user.id === id) {
                for (const key in userProps as Record<
                    keyof CreateUserDto,
                    keyof typeof CreateUserDto
                >) {
                    const typedKey = key as keyof CreateUserDto;
                    const propValue =  userProps[typedKey];
                    if(propValue) user[typedKey] = propValue;
                }
                updatedUser = user;
            }
            return user;
        });
        const user = this.userValidator.isExist(updatedUser, id);
        await this.save(updatedUsers);
        return user;
    }

    private save(users: UserEntity[]): Promise<void> {
        let csvRaws = this.csvParser.arrayToCsvRaws(users);
        if (csvRaws) csvRaws = `${this.header}\n${csvRaws}`;
        else csvRaws = `${this.header}`;
        return fsp.writeFile(this.storagePath, csvRaws, { encoding: "utf-8" });
    }

    logOptions(): Promise<void> {
        const options = { currId: String(this.currId) };
        const rawOptions = this.optionParser.convertToOptions(options);
        return fsp.writeFile(this.optionsPath, rawOptions);
    }

    async readOptions(): Promise<void> {
        const rawOptions = await fsp.readFile(this.optionsPath, {
            encoding: "utf-8",
        });
        const options = this.optionParser.parseOptions(rawOptions);
        this.currId = Number(options.currId);
    }
}

export { UserRepository };
