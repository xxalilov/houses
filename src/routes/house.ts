import { Router } from "express";
import {
  createHouse,
  deleteHouse,
  getHouses,
  getHouse,
  updateHouse,
} from "../controllers/house";
import { adminAuth } from "../middlewares/auth";
import { currentUser } from "../middlewares/current-user";
import { validateRequest } from "../middlewares/validate-request";
import { createHouseValidator } from "../validators/create-house-validator";
import { updateHouseValidator } from "../validators/update-house-validator";

const router = Router();

console.log(createHouseValidator);

router
  .route("/")
  .post(
    currentUser,
    adminAuth,
    createHouseValidator,
    validateRequest,
    createHouse
  )
  .get(getHouses);

router
  .route("/:id")
  .get(getHouse)
  .put(
    currentUser,
    adminAuth,
    updateHouseValidator,
    validateRequest,
    updateHouse
  )
  .delete(currentUser, adminAuth, deleteHouse);

export { router as houseRoutes };
