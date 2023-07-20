import { DataTypes, Sequelize } from "sequelize";
import { Models, modelNames } from "./config";

const getMillaModel = (sequelize: Sequelize) => {
  const Milla: Models[modelNames.milla] = sequelize.define(
    modelNames.milla,
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      WS2008_TH: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS2008_TT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS2012_TH: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS2012_TT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS4615_TH: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS4615_TT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      MC2039_TH: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      MC2039_TT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      MC2039_LC_LH: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      MC2039_LC_TT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS2021_TH: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS2021_TT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS4407_TH: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS4407_TT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS4420_TH: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS4420_TT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS4442_TH: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS4442_TT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS4465_TH: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS4465_TT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS4487_TH: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS4487_TT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS4497_TH: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS4497_TT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS4578_TH: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS4578_TT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS4596_TH: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS4596_TT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS6002_TH: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WS6002_TT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      FB117_TH: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      FB117_TT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      FB118_TH: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      FB118_TT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      FB4605_TH: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      FB4605_TT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      FB4606_TH: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      FB4606_TT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      FB4007_TH: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      FB4007_TT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      FB4008_TH: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      FB4008_TT: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Milla;
};

export default getMillaModel;
