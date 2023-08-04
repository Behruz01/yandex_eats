import config from "config";
import { relations } from "../models/Relations";
import { sequelize } from "./../database/connection";
import { Application } from "express";

export const run = async (app: Application) => {
  relations();
  await sequelize.authenticate({
    logging: false,
  });
  await sequelize.sync({
    alter: true,
    logging: false,
  });
  console.log("connect to database ...");
  app.listen(config.get("PORT"), () => {
    console.log(config.get("PORT"));
  });
};
