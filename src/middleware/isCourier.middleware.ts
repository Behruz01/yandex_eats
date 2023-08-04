import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../api/utils/jwt";
interface nom extends Request {
  verifyCourier?: number;
  id?: number;
}
export const isCourier = async (
  req: nom,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Invalid Token" });

    const { id } = verifyToken(token) as nom;

    req.verifyCourier = id;
    next();
  } catch (error) {
    next(error);
  }
};
