"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdmins = exports.addAdmin = exports.superAdmin = void 0;
const Admin_1 = __importDefault(require("../../models/Admin"));
const jwt_1 = require("../utils/jwt");
const superAdmin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin_1.default.findAll();
        if (admin[0].dataValues.username !== username &&
            admin[0].dataValues.password !== password)
            return res
                .status(200)
                .json({ message: "Incorrect username or password" });
        const token = (0, jwt_1.signToken)({ id: admin[0].dataValues.id });
        res.status(201).json({ message: "Success", token });
    }
    catch (error) {
        next(error);
    }
};
exports.superAdmin = superAdmin;
// Avval supper admin yarating
const addAdmin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const admins = await Admin_1.default.create({ username, password });
        const token = (0, jwt_1.signToken)({ id: admins.dataValues.id });
        res.status(201).json({ message: "Successfully created admin", token });
    }
    catch (error) {
        next(error);
    }
};
exports.addAdmin = addAdmin;
const getAdmins = async (req, res, next) => {
    try {
        const admins = await Admin_1.default.findAll();
        res.status(201).json({ admins });
    }
    catch (error) {
        next(error);
    }
};
exports.getAdmins = getAdmins;
