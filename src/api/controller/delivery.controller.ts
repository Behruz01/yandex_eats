import { NextFunction, Request, Response } from "express";
import Delivery from "../../models/Delivery";
import Order from "../../models/Order";

// status => "accept"  
// status => "cancel" 
export const postDelivery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, courier_id, order_id } = req.body;

    const orders = await Order.findOne({ where: { id: order_id } });
    const statusOrder = orders?.dataValues.status !== "pending";

    if (statusOrder) {
      return res.status(200).json({ message: "Bu buyurtma olib borilyapti" });
    } else {
      await Delivery.create({
        status,
        courier_id,
        order_id,
      });
      if (status == "accept") {
        await Order.update(
          { status: "delivering" },
          { where: { id: order_id } }
        );
      }

      res.status(201).json({ message: "Successfully Created" });
    }
  } catch (error) {
    next(error);
  }
};

export const getDelivery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Delivery.findAll();

    res.status(200).json({ message: "OK", data });
  } catch (error) {
    next(error);
  }
};
export const updatedDelivery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, courier_id, order_id } = req.body;
    const { id } = req.params;
    if (status === "cancel") {
      await Order.update({ status: "pending" }, { where: { id: id } });
    } else if (status === "success") {
      await Order.update({ status: "delivered" }, { where: { id: id } });
    }
    await Delivery.update({ status, courier_id, order_id }, { where: { id } });
    res.status(201).json({ message: "Updated Delivery" });
  } catch (error) {
    next(error);
  }
};

export const deleteDelivery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await Delivery.destroy({ where: { id } });
    res.status(201).json({ message: "Delited Delivery" });
  } catch (error) {
    next(error);
  }
};

export const getOneDelivery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const data = await Delivery.findOne({ where: { id } });

    res.status(200).json({ message: "OK", data });
  } catch (error) {
    next(error);
  }
};

interface nom extends Request {
  verifyCourier?: number;
  id?: number;
}
export const getStory = async (req: nom, res: Response, next: NextFunction) => {
  try {
    const id = req.verifyCourier;
    const courierOne: any = await Delivery.findOne({
      where: { courier_id: id },
    });
    if (courierOne == null) {
      return res
        .status(404)
        .json({ message: "Siz hali buyurtma yetkazmadingiz" });
    }

    
    res.status(200).json({ courierOne });
  } catch (error) {
    next(error);
  }
};
