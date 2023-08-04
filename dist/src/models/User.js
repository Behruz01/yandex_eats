"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../database/connection");
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    id;
    name;
    email;
    password;
    phoneNumber;
    address;
    balance;
    is_verified;
    createdAt;
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
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
    balance: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 0,
    },
    is_verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: connection_1.sequelize,
    tableName: "users",
    createdAt: "created_at",
});
exports.default = User;
