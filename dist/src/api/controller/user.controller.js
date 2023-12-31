"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoryUser = exports.putUser = exports.verifyEmail = exports.getUser = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../../models/User"));
const email_service_1 = require("../utils/email.service");
const redis_1 = require("redis");
const jwt_1 = require("../utils/jwt");
const Order_1 = __importDefault(require("../../models/Order"));
// Email SMS orqali verification qilinadi
// Ishlatishdan oldin Redisni yoqing
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, phoneNumber, address, latitude, longitude } = req.body;
        await User_1.default.create({
            name,
            email,
            password,
            phoneNumber,
            address,
            latitude,
            longitude,
        });
        const code = Math.floor(100000 + Math.random() * 900000);
        const client = (0, redis_1.createClient)();
        client.on("error", (err) => console.log("Redis Client Error", err));
        await client.connect();
        await client.set("code", code);
        await client.set("email", email);
        client.expire("code", 180);
        client.expire("email", 180);
        const mailData = {
            from: "abdulazizkenjaoxunov@gmail.com",
            to: email,
            subject: "Sending Email using Node.js",
            text: "That was easy!",
            html: `<b>Hey there whats upp! </b>
        <br>Brat shu sizning maxfiy codingiz: ${code} <br/>`,
        };
        await (0, email_service_1.send)(mailData);
        await client.disconnect();
        res.status(201).json({ message: "SMS sent to your Email" });
    }
    catch (error) {
        next(error);
        res.status(500).json({ error: error.message });
    }
};
exports.registerUser = registerUser;
// Login
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userEmail = await User_1.default.findOne({ where: { email } });
        if (userEmail?.dataValues.email !== email &&
            userEmail?.dataValues.password !== password) {
            return res.status(403).json({ message: "Invalid email or password" });
        }
        const id = userEmail?.dataValues.id;
        const token = (0, jwt_1.signToken)({ id: id });
        res.status(200).json({ message: "Success", token });
    }
    catch (error) {
        next(error);
    }
};
exports.loginUser = loginUser;
// GETUSER 
const getUser = async (req, res, next) => {
    try {
        const data = await User_1.default.findAll();
        res.status(201).json({ data });
    }
    catch (error) {
        next(error);
        res.status(500).json({ error: error.message });
    }
};
exports.getUser = getUser;
// EMAIL VERIFY
const verifyEmail = async function (req, res, next) {
    try {
        const { verifyCode } = req.body;
        const client = (0, redis_1.createClient)();
        client.on("error", (err) => console.log("Redis Client Error", err));
        await client.connect();
        const email = await client.get("email");
        const code = await client.get("code");
        if (code != verifyCode) {
            return res.status(403).json({ message: "Invalid code" });
        }
        const user = await User_1.default.findOne({ where: { email } });
        await User_1.default.update({ is_verified: true }, {
            where: {
                email,
            },
        });
        const id = user?.dataValues.id;
        const token = (0, jwt_1.signToken)({ id: id });
        res.status(200).json({ message: "Success", token: token });
        await client.disconnect();
    }
    catch (error) {
        next(error);
    }
};
exports.verifyEmail = verifyEmail;
// UPDATE USER 
const putUser = async (req, res, next) => {
    try {
        const { balance, latitude, longitude } = req.body;
        const { id } = req.params;
        await User_1.default.update({ balance, latitude, longitude }, { where: { id } });
        res.status(203).json({ message: "User updated successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.putUser = putUser;
const getStoryUser = async (req, res, next) => {
    try {
        const id = req.verifyUser;
        const userOne = await Order_1.default.findOne({
            where: { user_id: id },
        });
        console.log(userOne === null);
        if (userOne === null) {
            return res.status(401).json({ message: "Siz hali buyurtma bermadingiz" });
        }
        res.status(200).json({ userOne });
    }
    catch (error) {
        next(error);
    }
};
exports.getStoryUser = getStoryUser;
