import { NextFunction, Request, Response } from "express";
import { CustomError } from "../api/utils/custom-error";

export const hendlerError = async (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.code || 500).json({ message: error.message });
};
