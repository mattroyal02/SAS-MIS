import { getMysqlConnection } from "common";
import { Request, Response } from "express";

const getNumberOfGuests = async (_: Request, res: Response) => {
  const {
    models: { user: User },
  } = getMysqlConnection();

  const data = await User.count({
    where: {
      role: "client",
    },
  });
  // console.log("body", data);
  res.send({ data });
};

export default getNumberOfGuests;
