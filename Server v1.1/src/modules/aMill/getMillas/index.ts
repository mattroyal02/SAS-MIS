import { getMysqlConnection } from "common";
import { Request, Response } from "express";

const getAMills = async (_: Request, res: Response) => {
  const {
    models: { mill_a: Milla },
  } = getMysqlConnection();

  const data = await Milla.findAll();
  console.log("body", data);
  res.send({ data });
};

export default getAMills;
