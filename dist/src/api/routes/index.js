"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = require("./user.route");
const admin_route_1 = require("./admin.route");
const courier_route_1 = require("./courier.route");
const delivery_route_1 = require("./delivery.route");
const food_route_1 = require("./food.route");
const order_route_1 = require("./order.route");
const restaurant_route_1 = require("./restaurant.route");
const payments_route_1 = require("./payments.route");
exports.default = [
    user_route_1.router,
    user_route_1.router,
    admin_route_1.router,
    courier_route_1.router,
    delivery_route_1.router,
    food_route_1.router,
    order_route_1.router,
    restaurant_route_1.router,
    payments_route_1.router,
];
