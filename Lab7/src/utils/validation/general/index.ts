import { PostValidator } from "@validation/general/post.validator.js";
import { UserValidator } from "@validation/general/user.validator.js";
import { PageValidator } from "@validation/general/page.validator.js";
import { GeneralValidator } from "@validation/general/general.validator.js";

const postValidator = new PostValidator();
const userValidator = new UserValidator();
const pageValidator = new PageValidator();
const generalValidator = new GeneralValidator();

export { postValidator, userValidator, pageValidator, generalValidator };
