import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../api/utils/jwt";

interface nom extends Request {
  verifyUser?: number;
  id?: number;
}
export const isAuth = (req: nom, res: Response, next: NextFunction) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Invalid Token" });

    const { id } = verifyToken(token) as nom;

    req.verifyUser = id;

    next();
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
