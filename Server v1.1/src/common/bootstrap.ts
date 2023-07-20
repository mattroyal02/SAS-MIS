import { DATABASE, getMysqlConnection } from "./sequelize";

const bootstrap = async () => {
  const { dbConn } = getMysqlConnection(false, false);
  await dbConn.query(`DROP DATABASE IF EXISTS \`${DATABASE}\``);
  await dbConn.query(`CREATE DATABASE\`${DATABASE}\``);
  const { dbConn: realConn } = getMysqlConnection(true);
  await realConn.sync({ force: true });
};

const alter = async () => {
  const { dbConn } = getMysqlConnection();
  await dbConn.sync({ alter: true });
};
export { alter, bootstrap };
