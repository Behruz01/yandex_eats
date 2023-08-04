"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationRest = exports.getOneRestaurant = exports.deleteRestaurant = exports.updatedRestaurant = exports.getRestaurant = exports.postRestaurant = void 0;
const uuid_1 = require("uuid");
const Restaurant_1 = __importDefault(require("../../models/Restaurant"));
const Food_1 = __importDefault(require("../../models/Food"));
const User_1 = __importDefault(require("../../models/User"));
const postRestaurant = async (req, res, next) => {
    try {
        const { name, latitude, finishedTime, longitude, startTime } = req.body;
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
        await Restaurant_1.default.create({
            image: imageName,
            name,
            latitude,
            longitude,
            startTime,
            finishedTime,
        });
        res.status(201).json({ message: "Successfully Created" });
    }
    catch (error) {
        next(error);
    }
};
exports.postRestaurant = postRestaurant;
const getRestaurant = async (req, res, next) => {
    try {
        const data = await Restaurant_1.default.findAll({
            include: {
                model: Food_1.default,
            },
        });
        res.status(200).json({ message: "OK", data });
    }
    catch (error) {
        next(error);
    }
};
exports.getRestaurant = getRestaurant;
const updatedRestaurant = async (req, res, next) => {
    try {
        const { name, balance, latitude, longitude, finishedTime, startTime } = req.body;
        const { id } = req.params;
        await Restaurant_1.default.update({ name, balance, latitude, longitude, finishedTime, startTime }, { where: { id } });
        res.status(201).json({ message: "Updated Restaurant" });
    }
    catch (error) {
        next(error);
    }
};
exports.updatedRestaurant = updatedRestaurant;
const deleteRestaurant = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Restaurant_1.default.destroy({ where: { id } });
        res.status(201).json({ message: "Delete Restaurant" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteRestaurant = deleteRestaurant;
const getOneRestaurant = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Restaurant_1.default.findOne({ where: { id } });
        res.status(200).json({ message: "OK", data });
    }
    catch (error) {
        next(error);
    }
};
exports.getOneRestaurant = getOneRestaurant;
const getLocationRest = async (req, res, next) => {
    try {
        const userId = req.verifyUser;
        const user = await User_1.default.findOne({ where: { id: userId } });
        const userLongitude = user?.dataValues.longitude;
        const userLatitude = user?.dataValues.latitude;
        const restaurants = await Restaurant_1.default.findAll({
            include: {
                model: Food_1.default,
            },
        });
        const ratios = restaurants.map((restaurant) => {
            const distanceToRestoran = Math.sqrt((restaurant.dataValues.longitude - userLongitude) ** 2 +
                (restaurant.dataValues.latitude - userLatitude) ** 2);
            return { restaurant: restaurant.dataValues.name, distance: distanceToRestoran };
        });
        ratios.sort((a, b) => a.distance - b.distance);
        const closestRestaurants = ratios.slice(0, 3).map((restaurant) => restaurant.restaurant);
        res.status(200).json({ closestRestaurants });
    }
    catch (error) {
        console.error(error);
        next;
    }
};
exports.getLocationRest = getLocationRest;
