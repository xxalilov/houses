import { body } from "express-validator";

export const signupUserValidator = [
  body("name").isString().isLength({ min: 5, max: 20 }),
  body("phone").isInt().isLength({ max: 9, min: 9 }),
  body("email").isEmail(),
  body("password").isString().isLength({ min: 5, max: 12 }),
];
