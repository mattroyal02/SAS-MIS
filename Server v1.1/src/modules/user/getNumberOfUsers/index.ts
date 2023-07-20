import { getMysqlConnection } from "common";
import { Request, Response } from "express";

const getNumberOfUsers = async (_: Request, res: Response) => {
  const {
    models: { user: User },
  } = getMysqlConnection();

  const data = await User.count();
  // console.log("body", data);
  res.send({ data });
};

export default getNumberOfUsers;
