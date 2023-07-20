import {
  BinMultiplierAttributes,
  BinMultiplierCreationAttributes,
  MillaAttributes,
  MillaCreationAttributes,
  ProductAttributes,
  ProductCreationAttributes,
  ReportAttributes,
  ReportCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
} from "common/interfaces";
import { ModelDefined } from "sequelize";

enum modelNames {
  user = "user",
  product = "product",
  report = "report",
  binMultiplier = "binMultiplier",
  userReport = "userReport",
  milla = "mill_a",
}

interface Models {
  [modelNames.user]: ModelDefined<UserAttributes, UserCreationAttributes>;
  [modelNames.product]: ModelDefined<
    ProductAttributes,
    ProductCreationAttributes
  >;
  [modelNames.report]: ModelDefined<ReportAttributes, ReportCreationAttributes>;
  [modelNames.milla]: ModelDefined<MillaAttributes, MillaCreationAttributes>;
  [modelNames.binMultiplier]: ModelDefined<
    BinMultiplierAttributes,
    BinMultiplierCreationAttributes
  >;
}

export { Models, modelNames };
