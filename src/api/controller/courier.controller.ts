import { NextFunction, Request, Response } from "express";
import Courier from "../../models/Courier";
import { signToken } from "../utils/jwt";

export const postCourier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, phoneNumber } = req.body;

    const courier = await Courier.create({
      username,
      phoneNumber,
    });

    const token = signToken({ id: courier.dataValues.id });

    res.status(201).json({ message: "Successfully Created", token });
  } catch (error) {
    next(error);
  }
};
export const loginCourier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, phoneNumber } = req.body;
    const userEmail = await Courier.findOne({ where: { phoneNumber } });
    if (
      userEmail?.dataValues.username !== username &&
      userEmail?.dataValues.phoneNumber !== phoneNumber
    ) {
      return res.status(403).json({ message: "Invalid email or password" });
    }

    const id = userEmail?.dataValues.id;

    await Courier.create({
      username,
      phoneNumber,
    });
    const token = signToken({ id: id });

    res.status(201).json({ message: "Successfully Created", token });
  } catch (error) {
    next(error);
  }
};

export const getCourier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Courier.findAll();

    res.status(200).json({ message: "OK", data });
  } catch (error) {
    next(error);
  }
};
export const updatedCourier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, phoneNumber } = req.body;
    const { id } = req.params;
    await Courier.update({ username, phoneNumber }, { where: { id } });
    res.status(201).json({ message: "Updated Courier" });
  } catch (error) {
    next(error);
  }
};

export const deleteCourier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await Courier.destroy({ where: { id } });
    res.status(201).json({ message: "Deleted Courier" });
  } catch (error) {
    next(error);
  }
};

export const getOneCourier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const data = await Courier.findOne({ where: { id } });

    res.status(200).json({ message: "OK", data });
  } catch (error) {
    next(error);
  }
};
