"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modules = void 0;
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("../api/routes"));
const hendler_error_1 = require("../middleware/hendler-error");
const modules = async (app) => {
    app.use(express_1.default.json());
    app.use((0, express_fileupload_1.default)());
    app.use((0, cors_1.default)({
        origin: "*",
    }));
    app.use(express_1.default.static(process.cwd() + "/uploads"));
    app.use(routes_1.default);
    app.use(hendler_error_1.hendlerError);
};
exports.modules = modules;
