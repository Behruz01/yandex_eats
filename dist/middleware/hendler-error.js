"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hendlerError = void 0;
const hendlerError = async (error, req, res, next) => {
    res.status(error.code || 500).json({ message: error.message });
};
exports.hendlerError = hendlerError;
