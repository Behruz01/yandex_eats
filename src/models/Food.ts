import { sequelize } from "../database/connection";
import { DataTypes, Model } from "sequelize";

class Food extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public image!: string;
  public createdAt!: Date;
}

Food.init(
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    sequelize,
    tableName: "food",
  }
);

export default Food;
