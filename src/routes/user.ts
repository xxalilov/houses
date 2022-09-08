import { Router } from "express";
import { getAllUsers } from "../controllers/user";
import { adminAuth } from "../middlewares/auth";
import { currentUser } from "../middlewares/current-user";

const router = Router();

router.get("/", currentUser, adminAuth, getAllUsers);

export { router as userRoutes };
