import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import Food from "../../models/Food";

//create foods
interface imgType extends Request {
  imageName: string;
}
export const postFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, restaurant_id } = req.body;
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

    await Food.create({ image: imageName, name, price, restaurant_id });

    res.status(201).json({ message: "Successfully Created" });
  } catch (error) {
    console.log(error);
    
    next(error);
  }
};
//get all foods

export const getFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foods = await Food.findAll();

    res.status(200).json({ message: "OK", foods });
  } catch (error) {
    next(error);
  }
};
//GetOne
export const getOneFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const foods = await Food.findByPk(id);

    res.status(200).json({ message: "OK", foods });
  } catch (error) {
    next(error);
  }
};
//update
export const updateFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, price, restaurant_id } = req.body;

    await Food.update({ name, price, restaurant_id }, { where: { id } });

    res.status(201).json({ message: "Successfully Updated" });
  } catch (error) {
    next(error);
  }
};


//Delete
export const deleteFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await Food.destroy({ where: { id } });
    res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    next(error);
  }
};
