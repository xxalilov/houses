import { Router } from "express";
import { current, signin, signout, signup } from "../controllers/auth";
import { currentUser } from "../middlewares/current-user";
import { validateRequest } from "../middlewares/validate-request";
import { signinUserValidator } from "../validators/signin-user-validator";
import { signupUserValidator } from "../validators/signup-user-validator";

const router = Router();

router.post("/signup", signupUserValidator, validateRequest, signup);
router.post("/signin", signinUserValidator, validateRequest, signin);
router.post("/signout", signout);
router.get("/currentuser", currentUser, current);

export { router as authRoutes };
