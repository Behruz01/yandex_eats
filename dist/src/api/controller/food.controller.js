"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFoods = exports.putFoods = exports.getFoodsId = exports.getFoods = exports.postFoods = void 0;
const uuid_1 = require("uuid");
const Food_1 = __importDefault(require("../../models/Food"));
const postFoods = async (req, res, next) => {
    try {
        const { name, price, restaurant_id } = req.body;
        const image = req.files?.image;
        if (!image) {
            return res.status(400).json({ message: "Image not found" });
        }
        const extname = Array.isArray(image)
            ? image[0].mimetype.split("/")[1]
            : image.mimetype.split("/")[1];
        const imageName = `${(0, uuid_1.v4)()}.${extname}`;
        if (Array.isArray(image)) {
            image[0].mv(`${process.cwd()}/uploads/${imageName}`);
        }
        else {
            image.mv(`${process.cwd()}/uploads/${imageName}`);
        }
        await Food_1.default.create({ image: imageName, name, price, restaurant_id });
        res.status(201).json({ message: "Successfully Created" });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.postFoods = postFoods;
//GET
const getFoods = async (req, res, next) => {
    try {
        const foods = await Food_1.default.findAll();
        res.status(200).json({ message: "OK", foods });
    }
    catch (error) {
        next(error);
    }
};
exports.getFoods = getFoods;
//GetOne
const getFoodsId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const foods = await Food_1.default.findByPk(id);
        res.status(200).json({ message: "OK", foods });
    }
    catch (error) {
        next(error);
    }
};
exports.getFoodsId = getFoodsId;
//PUT
const putFoods = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, price, restaurant_id } = req.body;
        await Food_1.default.update({ name, price, restaurant_id }, { where: { id } });
        res.status(201).json({ message: "Successfully Updated" });
    }
    catch (error) {
        next(error);
    }
};
exports.putFoods = putFoods;
//Delete
const deleteFoods = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Food_1.default.destroy({ where: { id } });
        res.status(200).json({ message: "Successfully Deleted" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteFoods = deleteFoods;
