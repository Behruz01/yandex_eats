"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSameDayOrders = exports.getDay = exports.getDenied = exports.getDelivering = exports.getDelivered = exports.getPending = exports.getOneOrder = exports.deleteOrder = exports.updatedOrder = exports.getOrder = exports.postOrder = void 0;
const Order_1 = __importDefault(require("../../models/Order"));
const postOrder = async (req, res, next) => {
    try {
        const { balance, user_id, restaurant_id, food_id } = req.body;
        await Order_1.default.create({
            balance,
            user_id,
            restaurant_id,
            food_id,
        });
        res.status(201).json({ message: "Successfully Created" });
    }
    catch (error) {
        next(error);
    }
};
exports.postOrder = postOrder;
const getOrder = async (req, res, next) => {
    try {
        const data = await Order_1.default.findAll();
        res.status(200).json({ message: "OK", data });
    }
    catch (error) {
        next(error);
    }
};
exports.getOrder = getOrder;
const updatedOrder = async (req, res, next) => {
    try {
        const { status, balance, user_id, restaurant_id, food_id } = req.body;
        const { id } = req.params;
        await Order_1.default.update({ status, balance, user_id, restaurant_id, food_id }, { where: { id } });
        res.status(201).json({ message: "Updated Order" });
    }
    catch (error) {
        next(error);
    }
};
exports.updatedOrder = updatedOrder;
const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Order_1.default.destroy({ where: { id } });
        res.status(201).json({ message: "Delited Order" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteOrder = deleteOrder;
const getOneOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Order_1.default.findOne({ where: { id } });
        res.status(200).json({ message: "OK", data });
    }
    catch (error) {
        next(error);
    }
};
exports.getOneOrder = getOneOrder;
const getPending = async (req, res, next) => {
    try {
        const pending = await Order_1.default.findAll();
        const result = pending.filter((el) => el.dataValues.status == "pending");
        res.status(200).json({ result });
    }
    catch (error) {
        next(error);
    }
};
exports.getPending = getPending;
const getDelivered = async (req, res, next) => {
    try {
        const delivered = await Order_1.default.findAll();
        const result = delivered.filter((el) => el.dataValues.status == "delivered");
        res.status(200).json({ result });
    }
    catch (error) {
        next(error);
    }
};
exports.getDelivered = getDelivered;
const getDelivering = async (req, res, next) => {
    try {
        const delivering = await Order_1.default.findAll();
        const result = delivering.filter((el) => el.dataValues.status == "delivering");
        res.status(200).json({ result });
    }
    catch (error) {
        next(error);
    }
};
exports.getDelivering = getDelivering;
const getDenied = async (req, res, next) => {
    try {
        const denied = await Order_1.default.findAll();
        const result = denied.filter((el) => el.dataValues.status == "denied");
        res.status(200).json({ result });
    }
    catch (error) {
        next(error);
    }
};
exports.getDenied = getDenied;
const getDay = async (req, res, next) => {
    try {
        const orders = await Order_1.default.findAll();
        const start = new Date();
        const startDate = new Date(start.getTime() - 24 * 60 * 60 * 1000); // Son 1 saatlik zaman aralığının başlangıç tarihini hesapla
        const dailyOrders = orders.filter((order) => order.dataValues.createdAt >= startDate &&
            order.dataValues.createdAt <= start);
        dailyOrders.forEach((order) => {
            console.log(`Order ID: ${order.dataValues.id}, Date: ${order.dataValues.createdAt}`);
        });
        console.log(dailyOrders.length);
        res.status(200).json({ dailyOrders });
    }
    catch (error) {
        next(error);
    }
};
exports.getDay = getDay;
const getSameDayOrders = async (req, res, next) => {
    try {
        const orders = await Order_1.default.findAll();
        const start = new Date();
        const startDate = new Date(start.getTime() - 24 * 60 * 60 * 1000); // Son 1 saatlik zaman aralığının başlangıç tarihini hesapla
        const dailyOrders = orders.filter((order) => order.dataValues.createdAt >= startDate &&
            order.dataValues.createdAt <= start);
        dailyOrders.forEach((order) => {
            console.log(`Order ID: ${order.dataValues.id}, Date: ${order.dataValues.createdAt}`);
        });
        const cound = dailyOrders.length;
        res.status(200).json({ message: `Kunlik buyurtmalar soni = ${cound} ` });
    }
    catch (error) {
        next(error);
    }
};
exports.getSameDayOrders = getSameDayOrders;
