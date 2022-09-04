import { body } from "express-validator";

export const updateHouseValidator = [
  body("price")
    .isInt({ min: 100, max: 1000000 })
    .withMessage("Price must be min 100 length and max 1000000 length")
    .optional({ nullable: true }),
  body("lat").isFloat().optional({ nullable: true }),
  body("lng").isFloat().optional({ nullable: true }),
  body("address").isString().optional({ nullable: true }),
];
