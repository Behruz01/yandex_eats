import { sequelize } from "../database/connection";
import { DataTypes, Model } from "sequelize";

class Restaurant extends Model {
  public id!: number;
  public name!: string;
  public latitude!: string;
  public longitude!: string;
  public startTime!: string;
  public finishedTime!: string;
  public image!: string;
  public balance!: string;
  public createdAt!: Date;
}

Restaurant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    finishedTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "restaurant",
    createdAt: "created_at",
  }
);

export default Restaurant;
