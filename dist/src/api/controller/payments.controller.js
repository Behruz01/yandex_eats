"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pay = void 0;
const stripe_1 = __importDefault(require("stripe"));
const User_1 = __importDefault(require("../../models/User"));
const Order_1 = __importDefault(require("../../models/Order"));
const Restaurant_1 = __importDefault(require("../../models/Restaurant"));
const stripeService = new stripe_1.default("sk_test_51NXaxvHY1oN4piIidi4lHq6XTZVs0V9raYZehCI3FpFgLwB0VPre5jibEUy7pJ3mJ0LVlvjSHDFM3WxldaEvd1A800rkX1ot0u", { apiVersion: "2022-11-15" });
const pay = async (req, res, next) => {
    let { amount, id, user_id, order_id, restaurant_id } = req.body;
    try {
        const order = await Order_1.default.findOne({ where: { id: order_id } });
        const user = await User_1.default.findOne({ where: { id: user_id } });
        const userBalance = user?.dataValues.balance;
        console.log(userBalance, amount);
        if (userBalance < amount)
            return res.status(403).json({ message: "Sizda mablag' yetarli emas" });
        const result = userBalance - amount;
        console.log(result);
        const restaurant = await Restaurant_1.default.findOne({
            where: { id: restaurant_id },
        });
        const allResult = restaurant?.dataValues.balance + amount;
        await User_1.default.update({ balance: result }, { where: { id: user_id } });
        await Restaurant_1.default.update({ balance: allResult }, { where: { id: user_id } });
        const payment = await stripeService.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Payment",
            payment_method: id,
            confirm: true,
        });
        // const user = await UserRepo.findOne({ where: { id: user_id } });
        // user!.balance = user?.balance + amount;
        // if (user) {
        //   await UserRepo.save(user);
        // }
        console.log("Payment", payment);
        res.json({
            message: "Payment was successful",
            success: true,
        });
    }
    catch (error) {
        console.log("Error", error);
        res.json({
            message: "Payment Failed",
            success: false,
        });
    }
};
exports.pay = pay;
