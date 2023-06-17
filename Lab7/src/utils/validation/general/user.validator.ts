import { ForbiddenException } from "@exception/entity/forbidden.exception.js";
import { GetAllUserQueryType } from "@type/user/get-all-user-query.type.js";
import { validateOrReject } from "class-validator";
import {
  createValidationOptions,
  updateValidationOptions,
} from "@enum/validator/index.js";
import { CreateUserDto } from "@dto/user/create-user.dto.js";

export class UserValidator {
  isUserPostTitleUndefined(query: GetAllUserQueryType) {
    if (query.userPostTitle)
      throw new ForbiddenException("userPostTitle must be empty");
  }

  validateCreateDto(createUserDto: CreateUserDto) {
    return validateOrReject(createUserDto, createValidationOptions);
  }

  validateUpdateDto(updatedUserDto: CreateUserDto) {
    return validateOrReject(updatedUserDto, updateValidationOptions);
  }

  validateGetAllQuery(query: GetAllUserQueryType) {
    return validateOrReject(query, updateValidationOptions);
  }
}
