import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/unauthorized-error";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization?.startsWith("Bearer")
  ) {
    // Set token from Bearer in header
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.token) {
    token = req.cookies?.token;
  }

  try {
    const decoded = jwt.verify(token, "mysecret") as UserPayload;
    req.currentUser = decoded;
    next();
  } catch (error) {
    throw new UnauthorizedError("Not authorize to access this route");
  }
};
