"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../database/connection");
const sequelize_1 = require("sequelize");
class Courier extends sequelize_1.Model {
    id;
    username;
    phoneNumber;
}
Courier.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: connection_1.sequelize,
    tableName: "courier",
});
exports.default = Courier;
