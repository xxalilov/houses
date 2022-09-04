import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../middlewares/async";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";

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

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      "efwdsv"
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).json({
      status: 201,
      data: user,
    });
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

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      "efwdsv"
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).json({
      status: 200,
      data: existingUser,
    });
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
    req.session = null;

    res.status(200).json({
      status: 200,
      data: {},
    });
  }
);

export { signup, signin, signout, current };
