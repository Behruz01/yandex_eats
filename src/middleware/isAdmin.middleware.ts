import { NextFunction, Request, RequestHandler, Response } from "express";
import { verifyToken } from "../api/utils/jwt";
import Admin from "../models/Admin";

interface nom extends Request {
  id?: number;
}

export const isAdmin = async (req: nom, res: Response, next: NextFunction) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    const { id } = verifyToken(token) as nom;

    const admins = await Admin.findAll();
    const idAdmins = await Admin.findOne({ where: { id } });

    const userAdmin = admins.map((el) => el.dataValues.username);
    const passAdmin = admins.map((el) => el.dataValues.password);

    if (!token) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    const usernamesAdmin = idAdmins?.dataValues.username;
    const passwordAdmin = idAdmins?.dataValues.password;

    console.log(userAdmin.includes(usernamesAdmin));

    if (
      userAdmin.includes(usernamesAdmin) &&
      passAdmin.includes(passwordAdmin)
    ) {
      return next();
    } else {
      res.status(401).json({ message: "Access denied" });
    }
  } catch (error) {
    next(error);
  }
};
