import { DataTypes, Sequelize } from "sequelize";
import { Models, modelNames } from "./config";

const getProductModel = (sequelize: Sequelize) => {
  const Product: Models[modelNames.product] = sequelize.define(
    modelNames.product,
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Product;
};

export default getProductModel;
