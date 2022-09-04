import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { User } from "../models/User";
import { asyncHandler } from "./async";

const userAuth = (req: Request, res: Response, next: NextFunction) => {
  const isLoggedIn = req.currentUser;

  if (!isLoggedIn) {
    throw new UnauthorizedError("You must login");
  }
  next();
};

const adminAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const loggedUser = req.currentUser;

    if (!loggedUser) {
      throw new UnauthorizedError("You must login");
    }

    const user = await User.findOne({ where: { id: loggedUser.id } });

    if (!user?.isAdmin) {
      throw new UnauthorizedError("Not authorize to access this route");
    }

    next();
  }
);

export { userAuth, adminAuth };
