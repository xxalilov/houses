import { body } from "express-validator";

export const signupUserValidator = [
  body("name")
    .isString()
    .isLength({ min: 3, max: 20 })
    .withMessage("Please fill the name"),
  body("phone").isInt().withMessage("Please fill the phone"),
  body("email").isEmail().withMessage("Please fill the email"),
  body("password")
    .isString()
    .isLength({ min: 5, max: 12 })
    .withMessage("Please fill the password between 5 and 12 characters"),
];
