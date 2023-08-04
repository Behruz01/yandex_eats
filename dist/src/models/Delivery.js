"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./../database/connection");
const sequelize_1 = require("sequelize");
class Delivery extends sequelize_1.Model {
    id;
    courierId;
    orderId;
    status;
    createdAt;
}
Delivery.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: "created_at",
    },
}, {
    sequelize: connection_1.sequelize,
    tableName: "deliver",
});
exports.default = Delivery;
