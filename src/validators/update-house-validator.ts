import { body } from "express-validator";

export const updateHouseValidator = [
  body("price").optional({ nullable: true }),
  body("lat").isFloat().optional({ nullable: true }),
  body("lng").isFloat().optional({ nullable: true }),
  body("address").isString().optional({ nullable: true }),
];
