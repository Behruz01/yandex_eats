import express, { Application } from "express";
import fileUpload from "express-fileupload";
import cors from "cors";

import routes from "../api/routes";
import { hendlerError } from "../middleware/hendler-error";

export const modules = async (app: Application) => {
  app.use(express.json());
  app.use(fileUpload());
  app.use(
    cors({
      origin: "*",
    })
  );

  app.use(express.static(process.cwd() + "/uploads"));

  app.use(routes);
  app.use(hendlerError);
};
