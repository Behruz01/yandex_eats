import Stripe from "stripe";
import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import Order from "../../models/Order";
import Restaurant from "../../models/Restaurant";

const stripeService = new Stripe(
  "sk_test_51NXaxAAt0rSDCgqM2zhoQlb5lKE7gCQ4uH19YMoS6xXVZpm8yfjio8C0Bfpzmew29GqBmxK0PvB8UsgurGRXw5tM007HiNxviT",
  { apiVersion: "2022-11-15" }
);

export const pay = async (req: Request, res: Response, next: NextFunction) => {
  let { amount, id, user_id, order_id, restaurant_id } = req.body;

  try {
    const user = await User.findOne({ where: { id: user_id } });

    const userBalance = user?.dataValues.balance;

    if (userBalance < amount)
      return res.status(403).json({ message: "Sizda mablag' yetarli emas" });

    const result = userBalance - amount;

    const restaurant = await Restaurant.findOne({
      where: { id: restaurant_id },
    });
    const allResult = restaurant?.dataValues.balance + amount;

    await User.update({ balance: result }, { where: { id: user_id } });
    await Restaurant.update({ balance: allResult }, { where: { id: user_id } });

    res.json({
      message: "Payment was successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
};
