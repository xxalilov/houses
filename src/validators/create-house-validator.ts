import { body } from "express-validator";

export const createHouseValidator = [
  body("price")
    .isInt({ min: 100, max: 1000000 })
    .withMessage("Price must be min 100 length and max 1000000 length"),
  body("lat").isFloat(),
  body("lng").isFloat(),
  body("address").isString(),
];
