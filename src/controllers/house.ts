import { NextFunction, Request, Response } from "express";
import { House } from "../models/House";
import { asyncHandler } from "../middlewares/async";
import { NotFoundError } from "../errors/not-found-error";
import { deleteFile } from "../services/file";

/**
 * @desc  Create House
 * @route POST /api/v1/house
 * @access  Private
 */
const createHouse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      req.body.image = req.file.path;
    }

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
    const query = req.query;

    const limit = Number(query.limit) || 3;
    const page = Number(query.page) || 1;

    let houses, allPages: number;
    let countData = 0;

    if (query.search) {
      const { count, rows } = await House.findAndCountAll({
        where: { address: query.search },
        offset: limit * page - limit,
        limit: limit,
      });
      countData = countData + count;
      allPages = Math.ceil(count / limit);
      houses = rows;
    } else {
      const { count, rows } = await House.findAndCountAll({
        offset: limit * page - limit,
        limit: limit,
      });

      countData = countData + count;

      allPages = Math.ceil(count / limit);
      houses = rows;
    }

    res.status(200).json({
      status: 200,
      allPages,
      count: countData,
      page,
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

    if (req.file) {
      deleteFile(house.image);
      req.body.image = req.file.path;
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

    if (house.image) {
      deleteFile(house.image);
    }

    house.destroy();

    res.status(200).json({
      status: 200,
      message: "House Deleted",
    });
  }
);

export { createHouse, getHouses, getHouse, deleteHouse, updateHouse };
