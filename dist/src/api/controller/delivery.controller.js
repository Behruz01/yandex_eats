"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStory = exports.getOneDelivery = exports.deleteDelivery = exports.updatedDelivery = exports.getDelivery = exports.postDelivery = void 0;
const Delivery_1 = __importDefault(require("../../models/Delivery"));
const Order_1 = __importDefault(require("../../models/Order"));
// status => "accept" bo'lsa courier qabul qilgan boladi
// status => "cancel" bo'lsa courier qabul qilmagan boladi
const postDelivery = async (req, res, next) => {
    try {
        const { status, courier_id, order_id } = req.body;
        const orders = await Order_1.default.findOne({ where: { id: order_id } });
        const statusOrder = orders?.dataValues.status !== "pending";
        if (statusOrder) {
            return res.status(200).json({ message: "Bu buyurtma olib borilyapti" });
        }
        else {
            await Delivery_1.default.create({
                status,
                courier_id,
                order_id,
            });
            if (status == "accept") {
                await Order_1.default.update({ status: "delivering" }, { where: { id: order_id } });
            }
            res.status(201).json({ message: "Successfully Created" });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.postDelivery = postDelivery;
const getDelivery = async (req, res, next) => {
    try {
        const data = await Delivery_1.default.findAll();
        res.status(200).json({ message: "OK", data });
    }
    catch (error) {
        next(error);
    }
};
exports.getDelivery = getDelivery;
const updatedDelivery = async (req, res, next) => {
    try {
        const { status, courier_id, order_id } = req.body;
        const { id } = req.params;
        if (status === "cancel") {
            await Order_1.default.update({ status: "pending" }, { where: { id: id } });
        }
        else if (status === "success") {
            await Order_1.default.update({ status: "delivered" }, { where: { id: id } });
        }
        await Delivery_1.default.update({ status, courier_id, order_id }, { where: { id } });
        res.status(201).json({ message: "Updated Delivery" });
    }
    catch (error) {
        next(error);
    }
};
exports.updatedDelivery = updatedDelivery;
const deleteDelivery = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Delivery_1.default.destroy({ where: { id } });
        res.status(201).json({ message: "Delited Delivery" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteDelivery = deleteDelivery;
const getOneDelivery = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Delivery_1.default.findOne({ where: { id } });
        res.status(200).json({ message: "OK", data });
    }
    catch (error) {
        next(error);
    }
};
exports.getOneDelivery = getOneDelivery;
const getStory = async (req, res, next) => {
    try {
        const id = req.verifyCourier;
        const courierOne = await Delivery_1.default.findOne({
            where: { courier_id: id },
        });
        console.log(courierOne);
        if (courierOne == null) {
            return res
                .status(404)
                .json({ message: "Siz hali buyurtma yetkazmadingiz" });
        }
        res.status(200).json({ courierOne });
    }
    catch (error) {
        next(error);
    }
};
exports.getStory = getStory;
