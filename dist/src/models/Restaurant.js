"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../database/connection");
const sequelize_1 = require("sequelize");
class Restaurant extends sequelize_1.Model {
    id;
    name;
    latitude;
    longitude;
    startTime;
    finishedTime;
    image;
    balance;
    createdAt;
}
Restaurant.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    latitude: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    longitude: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    startTime: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    finishedTime: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    balance: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: connection_1.sequelize,
    tableName: "restaurant",
    createdAt: "created_at",
});
exports.default = Restaurant;
