import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middlewares/async";
import { User } from "../models/User";

/**
 * @desc  Get all Users
 * @route POST /api/v1/user
 * @access  Private
 */
const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.findAll();

    res.status(200).json({
      status: 200,
      data: users,
    });
  }
);

export { getAllUsers };
