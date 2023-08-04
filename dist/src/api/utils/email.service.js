"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: "abdulazizkenjaoxunov@gmail.com",
        pass: "voibutzlaxatjoyi",
    },
    secure: true,
});
const send = async (mailData) => {
    const data = await transporter.sendMail(mailData);
    return { message: "Success", data: data };
};
exports.send = send;
