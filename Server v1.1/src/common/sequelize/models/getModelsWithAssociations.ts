import { Sequelize } from "sequelize";
import getBinMultiplierModel from "./binMultiplier";
import { modelNames, Models } from "./config";
import getMillaModel from "./milla";
import getProductModel from "./product";
import getReportModel from "./report";
import getUserModel from "./user";

const getModelsWithAssociations = (sequelize: Sequelize): Models => {
  const User = getUserModel(sequelize);
  const Product = getProductModel(sequelize);
  const Report = getReportModel(sequelize);
  const BinMultiplier = getBinMultiplierModel(sequelize);
  const MillA = getMillaModel(sequelize);

  // User.belongsToMany(Project, { through: UserReport });
  // Report.belongsToMany(User, { through: UserReport });

  const models: Models = {
    [modelNames.user]: User,
    [modelNames.product]: Product,
    [modelNames.report]: Report,
    [modelNames.binMultiplier]: BinMultiplier,
    [modelNames.milla]: MillA,
  };
  return models;
};

export { getModelsWithAssociations };
