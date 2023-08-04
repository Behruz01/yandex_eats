"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneCourier = exports.deleteCourier = exports.updatedCourier = exports.getCourier = exports.loginCourier = exports.postCourier = void 0;
const Courier_1 = __importDefault(require("../../models/Courier"));
const jwt_1 = require("../utils/jwt");
const postCourier = async (req, res, next) => {
    try {
        const { username, phoneNumber } = req.body;
        const courier = await Courier_1.default.create({
            username,
            phoneNumber,
        });
        const token = (0, jwt_1.signToken)({ id: courier.dataValues.id });
        res.status(201).json({ message: "Successfully Created", token });
    }
    catch (error) {
        next(error);
    }
};
exports.postCourier = postCourier;
const loginCourier = async (req, res, next) => {
    try {
        const { username, phoneNumber } = req.body;
        const userEmail = await Courier_1.default.findOne({ where: { phoneNumber } });
        if (userEmail?.dataValues.username !== username &&
            userEmail?.dataValues.phoneNumber !== phoneNumber) {
            return res.status(403).json({ message: "Invalid email or password" });
        }
        const id = userEmail?.dataValues.id;
        await Courier_1.default.create({
            username,
            phoneNumber,
        });
        const token = (0, jwt_1.signToken)({ id: id });
        res.status(201).json({ message: "Successfully Created", token });
    }
    catch (error) {
        next(error);
    }
};
exports.loginCourier = loginCourier;
const getCourier = async (req, res, next) => {
    try {
        const data = await Courier_1.default.findAll();
        // throw new Error("error");
        res.status(200).json({ message: "OK", data });
    }
    catch (error) {
        next(error);
    }
};
exports.getCourier = getCourier;
const updatedCourier = async (req, res, next) => {
    try {
        const { username, phoneNumber } = req.body;
        const { id } = req.params;
        await Courier_1.default.update({ username, phoneNumber }, { where: { id } });
        res.status(201).json({ message: "Updated Courier" });
    }
    catch (error) {
        next(error);
    }
};
exports.updatedCourier = updatedCourier;
const deleteCourier = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Courier_1.default.destroy({ where: { id } });
        res.status(201).json({ message: "Deleted Courier" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCourier = deleteCourier;
const getOneCourier = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Courier_1.default.findOne({ where: { id } });
        res.status(200).json({ message: "OK", data });
    }
    catch (error) {
        next(error);
    }
};
exports.getOneCourier = getOneCourier;
