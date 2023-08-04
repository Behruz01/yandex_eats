import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";

import Restaurant from "../../models/Restaurant";
import Food from "../../models/Food";
import User from "../../models/User";

// create restuarant
export const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, latitude, finishedTime, longitude, startTime } = req.body;
    const image = req.files?.image;

    if (!image) {
      return res.status(400).json({ message: "Image not found" });
    }

    const extname = Array.isArray(image)
      ? image[0].mimetype.split("/")[1]
      : image.mimetype.split("/")[1];
    const imageName = `${uuid()}.${extname}`;

    if (Array.isArray(image)) {
      image[0].mv(`${process.cwd()}/uploads/${imageName}`);
    } else {
      image.mv(`${process.cwd()}/uploads/${imageName}`);
    }

    await Restaurant.create({
      image: imageName,
      name,
      latitude,
      longitude,
      startTime,
      finishedTime,
    });

    res.status(201).json({ message: "Successfully Created" });
  } catch (error) {
    next(error);
  }
};

interface nom extends Request {
  verifyUser?: number;
}

// get all restaurant
export const getRestaurant = async (
  req: nom,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Restaurant.findAll({
      include: {
        model: Food,
      },
    });
    res.status(200).json({ message: "OK", data });
  } catch (error) {
    next(error);
  }
};

// update restaurant
export const updatedRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, balance, latitude, longitude, finishedTime, startTime } =
      req.body;
    const { id } = req.params;
    await Restaurant.update(
      { name, balance, latitude, longitude, finishedTime, startTime },
      { where: { id } }
    );
    res.status(201).json({ message: "Updated Restaurant" });
  } catch (error) {
    next(error);
  }
};

// delete restaurant
export const deleteRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await Restaurant.destroy({ where: { id } });
    res.status(201).json({ message: "Delete Restaurant" });
  } catch (error) {
    next(error);
  }
};

// get one restaurant
export const getOneRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const data = await Restaurant.findOne({ where: { id } });

    res.status(200).json({ message: "OK", data });
  } catch (error) {
    next(error);
  }
};

// get Location
export const getLocationRest = async (
  req: nom,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.verifyUser;
    const user = await User.findOne({ where: { id: userId } });
    const userLongitude = user?.dataValues.longitude;
    const userLatitude = user?.dataValues.latitude;

    const restaurants = await Restaurant.findAll({
      include: {
        model: Food,
      },
    });

    const ratios = restaurants.map((restaurant) => {
      const distanceToRestoran = Math.sqrt(
        (restaurant.dataValues.longitude - userLongitude) ** 2 +
          (restaurant.dataValues.latitude - userLatitude) ** 2
      );

      return {
        restaurant: restaurant.dataValues.name,
        distance: distanceToRestoran,
      };
    });

    ratios.sort((a, b) => a.distance - b.distance);

    const closestRestaurants = ratios
      .slice(0, 3)
      .map((restaurant) => restaurant.restaurant);

    res.status(200).json({ closestRestaurants });
  } catch (error) {
    console.error(error);
    next;
  }
};
