import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "postgres://postgres:2002@localhost:5432/yandexeats"
);
   
