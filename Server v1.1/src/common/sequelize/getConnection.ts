import { Options, Sequelize } from "sequelize";
import { getModelsWithAssociations } from "./models";

let existingConn: Sequelize | undefined;

const DATABASE = "pmc-nigel-mis";

const getMysqlDbConfig = (database?: string): Options => {
  return {
    username: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PWD || "Lukistarmat1",
    host: process.env.MYSQL_URL || "localhost",
    port: process.env.MYSQL_PORT ? +process.env.MYSQL_PORT : 3306,
    ...(database ? { database } : {}),
    dialect: "mysql",
    logging: false, // console.log,
    define: { freezeTableName: true, underscored: true },
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    timezone: "+02:00", //RSA time
  };
};

const getMysqlConnection = (withDatabase = true, persist = true) => {
  const dbConn =
    existingConn ||
    new Sequelize(getMysqlDbConfig(withDatabase ? DATABASE : undefined));
  if (!existingConn && persist) {
    existingConn = dbConn;
  }
  const models = getModelsWithAssociations(dbConn);
  return { dbConn, models };
};

export { DATABASE, getMysqlConnection, getMysqlDbConfig };
