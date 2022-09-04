import { NextFunction, Request, Response } from "express";
import { House } from "../models/House";
import { asyncHandler } from "../middlewares/async";
import { NotFoundError } from "../errors/not-found-error";

/**
 * @desc  Create House
 * @route POST /api/v1/house
 * @access  Private
 */
const createHouse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const house = await House.create(req.body);
    house.save();

    res.status(201).json({
      status: 201,
      data: house,
    });
  }
);

/**
 * @desc  Get Houses
 * @route GET /api/v1/house
 * @access  Public
 */
const getHouses = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const houses = await House.findAll();
    res.status(200).json({
      status: 200,
      data: houses,
    });
  }
);

/**
 * @desc  Get house by id
 * @route DELETE /api/v1/house/:id
 * @access  Public
 */
const getHouse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const house = await House.findOne({ where: { id: req.params.id } });

    if (!house) {
      throw new NotFoundError("house not found!");
    }

    res.status(200).json({
      status: 200,
      data: house,
    });
  }
);

/**
 * @desc  Update house by id
 * @route PUT /api/v1/house/:id
 * @access  Private
 */
const updateHouse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const house = await House.findOne({ where: { id: req.params.id } });

    if (!house) {
      throw new NotFoundError("house not found!");
    }

    const updatedHouse = await house.update(req.body);
    updatedHouse.save();

    res.status(200).json({
      status: 200,
      data: updatedHouse,
    });
  }
);

/**
 * @desc  Delete house
 * @route DELETE /api/v1/house/:id
 * @access  Private
 */
const deleteHouse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const house = await House.findOne({ where: { id: req.params.id } });

    if (!house) {
      throw new NotFoundError("house not found!");
    }

    house.destroy();

    res.status(200).json({
      status: 200,
      message: "House Deleted",
    });
  }
);

export { createHouse, getHouses, getHouse, deleteHouse, updateHouse };
