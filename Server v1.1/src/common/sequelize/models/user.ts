import { DataTypes, Sequelize } from "sequelize";
import { modelNames, Models } from "./config";

const getUserModel = (sequelize: Sequelize) => {
  const User: Models[modelNames.user] = sequelize.define(
    modelNames.user,
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      company_name: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      job_title: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return User;
};

export default getUserModel;
