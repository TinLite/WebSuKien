import sequelize from "../services/SequelizeConnection.js";
import { DataTypes, Model } from "sequelize";

const User = sequelize.define(
  "User",
  {
    ID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  {
    tableName: "user",
    timestamps: false,
  }
);

module.exports = User;
