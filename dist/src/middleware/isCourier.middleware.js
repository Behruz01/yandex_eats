"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCourier = void 0;
const jwt_1 = require("../api/utils/jwt");
const isCourier = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        if (!token)
            return res.status(401).json({ message: "Invalid Token" });
        const { id } = (0, jwt_1.verifyToken)(token);
        // console.log(id);
        req.verifyCourier = id;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.isCourier = isCourier;
