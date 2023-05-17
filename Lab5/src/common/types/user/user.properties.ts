import {UserEntity} from "../../../entity/user/user.entity.js";

type UserProperties = Record<keyof UserEntity, unknown>;

export type {UserProperties};
