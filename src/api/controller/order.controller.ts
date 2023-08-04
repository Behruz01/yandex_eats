import { NextFunction, Request, Response } from "express";
import Order from "../../models/Order";

// create 
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { balance, user_id, restaurant_id, food_id } = req.body;
     
    await Order.create({
      balance,
      user_id,
      restaurant_id,
      food_id,
    });

    res.status(201).json({ message: "Successfully Created" });
  } catch (error) {
    next(error);
  }
};
// get all
export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Order.findAll();

    res.status(200).json({ message: "OK", data });
  } catch (error) {
    next(error);
  }
};
// update
export const updatedOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, balance, user_id, restaurant_id, food_id } = req.body;
    const { id } = req.params;
    await Order.update(
      { status, balance, user_id, restaurant_id, food_id },
      { where: { id } }
    );
    res.status(201).json({ message: "Updated Order" });
  } catch (error) {
    next(error);
  }
};

// delete order
export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await Order.destroy({ where: { id } });
    res.status(201).json({ message: "Delited Order" });
  } catch (error) {
    next(error);
  }
};

// get One order
export const getOneOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const data = await Order.findOne({ where: { id } });

    res.status(200).json({ message: "OK", data });
  } catch (error) {
    next(error);
  }
};

// get oll pending
export const getPending = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pending = await Order.findAll();
    const result = pending.filter((el) => el.dataValues.status == "pending");
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

// get all delivered
export const getDelivered = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const delivered = await Order.findAll();
    const result = delivered.filter(
      (el) => el.dataValues.status == "delivered"
    );
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

// get all delivering
export const getDelivering = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const delivering = await Order.findAll();
    const result = delivering.filter(
      (el) => el.dataValues.status == "delivering"
    );
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

// get all denied
export const getDenied = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const denied = await Order.findAll();
    const result = denied.filter((el) => el.dataValues.status == "denied");
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

// get day
export const getDay = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.findAll();
    const start = new Date();
    const startDate = new Date(start.getTime() - 24 * 60 * 60 * 1000); // Son 1 saatlik zaman aralığının başlangıç tarihini hesapla

    const dailyOrders = orders.filter(
      (order) =>
        order.dataValues.createdAt >= startDate &&
        order.dataValues.createdAt <= start
    );

    dailyOrders.forEach((order) => {
      console.log(
        `Order ID: ${order.dataValues.id}, Date: ${order.dataValues.createdAt}`
      );
    });
    console.log(dailyOrders.length);

    res.status(200).json({ dailyOrders });
  } catch (error) {
    next(error);
  }
};

// get Same Day Orders
export const getSameDayOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.findAll();
    const start = new Date();
    const startDate = new Date(start.getTime() - 24 * 60 * 60 * 1000); 

    const dailyOrders = orders.filter(
      (order) =>
        order.dataValues.createdAt >= startDate &&
        order.dataValues.createdAt <= start
    );
    const cound = dailyOrders.length;
    res.status(200).json({ message: `Kunlik buyurtmalar soni = ${cound} ` });
  } catch (error) {
    next(error);
  }
};
