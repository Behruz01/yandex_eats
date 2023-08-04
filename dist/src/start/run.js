"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const config_1 = __importDefault(require("config"));
const Relations_1 = require("../models/Relations");
const connection_1 = require("./../database/connection");
const run = async (app) => {
    (0, Relations_1.relations)();
    await connection_1.sequelize.authenticate({
        logging: false,
    });
    await connection_1.sequelize.sync({
        alter: true,
        logging: false,
    });
    console.log("connect to database ...");
    app.listen(config_1.default.get("PORT"), () => {
        console.log(config_1.default.get("PORT"));
    });
};
exports.run = run;
