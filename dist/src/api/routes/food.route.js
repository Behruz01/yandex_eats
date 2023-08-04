"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const food_controller_1 = require("../controller/food.controller");
const isAdmin_middleware_1 = require("../../middleware/isAdmin.middleware");
exports.router = (0, express_1.Router)();
exports.router.post("/post/food", food_controller_1.postFoods);
exports.router.get("/get/food", food_controller_1.getFoods);
exports.router.get("/get/food/:id", food_controller_1.getFoodsId);
exports.router.put("/put/food/:id", isAdmin_middleware_1.isAdmin, food_controller_1.putFoods);
exports.router.delete("/delete/food/:id", isAdmin_middleware_1.isAdmin, food_controller_1.deleteFoods);
