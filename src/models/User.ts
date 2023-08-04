import { sequelize } from "../database/connection";
import { DataTypes, Model } from "sequelize";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public phoneNumber!: string;
  public address!: string;
  public balance!: string;
  public is_verified!: boolean;
  public createdAt!: Date;
}

User.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
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
    balance: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "users",
    createdAt: "created_at",
  }
);

export default User;
