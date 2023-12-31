"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const admin_controller_1 = require("../controller/admin.controller");
const isAdmin_middleware_1 = require("../../middleware/isAdmin.middleware");
exports.router = (0, express_1.Router)();
exports.router.post("/admin", isAdmin_middleware_1.isAdmin, admin_controller_1.superAdmin);
exports.router.post("/addAdmin", admin_controller_1.addAdmin);
exports.router.get("/getAdmins", isAdmin_middleware_1.isAdmin, admin_controller_1.getAdmins);
