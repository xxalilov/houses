import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../middlewares/async";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import { UnauthorizedError } from "../errors/unauthorized-error";

/**
 * @desc  Signup user
 * @route POST /api/v1/auth/signup
 * @access  Public
 */
const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = await User.create(req.body);
    user.save();

    sendTokenResponse(user, 201, res);
  }
);

/**
 * @desc  Signin user
 * @route POST /api/v1/auth/signin
 * @access  Public
 */
const signin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (!existingUser) {
      throw new BadRequestError("Email or password wrong!");
    }
    const matchPassword = await Password.compare(
      existingUser.password,
      req.body.password
    );

    if (!matchPassword) {
      throw new BadRequestError("Email or password wrong!");
    }

    sendTokenResponse(existingUser, 200, res);
  }
);

/**
 * @desc  Current User
 * @route POST /api/v1/auth/currentuser
 * @access  Private
 */
const current = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await req.currentUser;

    if (!user) {
      throw new UnauthorizedError("You must login");
    }
    res.status(200).json({
      status: 200,
      data: user,
    });
  }
);

/**
 * @desc  Signout user
 * @route POST /api/v1/auth/signout
 * @access  Private
 */
const signout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    req.cookies = null;

    res.status(200).json({
      status: 200,
      data: {},
    });
  }
);

const sendTokenResponse = (user: User, statusCode: number, res: Response) => {
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
    },
    "mysecret",
    {
      expiresIn: "30d",
    }
  );

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 1000),
    httpOnly: true,
    secure: false,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ status: statusCode, token });
};

export { signup, signin, signout, current };
