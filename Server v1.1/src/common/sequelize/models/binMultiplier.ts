import { DataTypes, Sequelize } from "sequelize";
import { Models, modelNames } from "./config";

const getBinMultiplierModel = (sequelize: Sequelize) => {
  const BinMultiplier: Models[modelNames.binMultiplier] = sequelize.define(
    modelNames.binMultiplier,
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
      multiplier: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return BinMultiplier;
};

export default getBinMultiplierModel;
