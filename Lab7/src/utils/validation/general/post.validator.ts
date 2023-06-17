import { validateOrReject } from "class-validator";
import {
  createValidationOptions,
  updateValidationOptions,
} from "@enum/validator/index.js";
import { CreatePostDto } from "@dto/post/create-post.dto.js";

export class PostValidator {
  validateCreateDto(createPostDto: CreatePostDto) {
    return validateOrReject(createPostDto, createValidationOptions);
  }
  validateUpdateDto(updatedPostDto: CreatePostDto) {
    return validateOrReject(updatedPostDto, updateValidationOptions);
  }
}
