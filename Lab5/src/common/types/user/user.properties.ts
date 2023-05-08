import {UserEntity} from "../../../entity/user/user.entity";

type UserProperties = Record<keyof UserEntity, unknown>;

export type {UserProperties};
