import { body } from "express-validator";

export const signinUserValidator = [
  body("email").isEmail(),
  body("password").isString(),
];
