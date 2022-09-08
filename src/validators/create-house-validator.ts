import { body } from "express-validator";

export const createHouseValidator = [
  body("price").isFloat().withMessage("price must be"),
  body("lat").isFloat().withMessage("lat must be"),
  body("lng").isFloat().withMessage("lng must be"),
  body("area").isFloat().withMessage("area must be"),
  body("address").isString().withMessage("address must be"),
];
