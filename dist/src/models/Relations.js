"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relations = void 0;
const Courier_1 = __importDefault(require("./Courier"));
const Delivery_1 = __importDefault(require("./Delivery"));
const Order_1 = __importDefault(require("./Order"));
const Restaurant_1 = __importDefault(require("./Restaurant"));
const User_1 = __importDefault(require("./User"));
const Food_1 = __importDefault(require("./Food"));
const relations = () => {
    // User model
    User_1.default.hasMany(Order_1.default, { foreignKey: "user_id" });
    Order_1.default.belongsTo(User_1.default, { foreignKey: "user_id" });
    // Restoran model
    Restaurant_1.default.hasMany(Food_1.default, { foreignKey: "restaurant_id" });
    Food_1.default.belongsTo(Restaurant_1.default, { foreignKey: "restaurant_id" });
    Restaurant_1.default.hasMany(Order_1.default, { foreignKey: "restaurant_id" });
    Order_1.default.belongsTo(Restaurant_1.default, { foreignKey: "restaurant_id" });
    // Food model
    Food_1.default.hasMany(Order_1.default, { foreignKey: "food_id" });
    Order_1.default.belongsTo(Food_1.default, { foreignKey: "food_id" });
    // Courier model
    Courier_1.default.hasMany(Delivery_1.default, { foreignKey: "courier_id" });
    Delivery_1.default.belongsTo(Courier_1.default, { foreignKey: "courier_id" });
    // Order model
    Order_1.default.hasOne(Delivery_1.default, { foreignKey: "order_id" });
    Delivery_1.default.belongsTo(Order_1.default, { foreignKey: "order_id" });
    // Admin model - No associations
    // Delivery model
    Delivery_1.default.belongsTo(Courier_1.default, { foreignKey: "courier_id" });
    Delivery_1.default.belongsTo(Order_1.default, { foreignKey: "order_id" });
};
exports.relations = relations;
