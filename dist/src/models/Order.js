"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./../database/connection");
const sequelize_1 = require("sequelize");
class Order extends sequelize_1.Model {
    id;
    userId;
    restoranId;
    foodId;
    status;
    rating;
    balance;
    createdAt;
}
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("pending", "delivered", "delivering", "denied"),
        allowNull: false,
        defaultValue: "pending",
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    balance: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: "created_at",
    },
}, {
    sequelize: connection_1.sequelize,
    tableName: "orders",
});
exports.default = Order;
