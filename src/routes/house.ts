import { Router } from "express";
import {
  createHouse,
  deleteHouse,
  getHouses,
  getHouse,
  updateHouse,
} from "../controllers/house";
import { adminAuth } from "../middlewares/auth";
import { validateRequest } from "../middlewares/validate-request";
import { createHouseValidator } from "../validators/create-house-validator";
import { updateHouseValidator } from "../validators/update-house-validator";

const router = Router();

console.log(createHouseValidator);

router
  .route("/")
  .post(adminAuth, createHouseValidator, validateRequest, createHouse)
  .get(getHouses);

router
  .route("/:id")
  .get(getHouse)
  .put(adminAuth, updateHouseValidator, validateRequest, updateHouse)
  .delete(adminAuth, deleteHouse);

export { router as houseRoutes };
