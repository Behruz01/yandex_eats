import { sequelize } from "../database/connection";
import { DataTypes, Model } from "sequelize";

class Courier extends Model {
  public id!: number;
  public username!: string;
  public phoneNumber!: string;
}

Courier.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "courier",
  }
);

export default Courier;
