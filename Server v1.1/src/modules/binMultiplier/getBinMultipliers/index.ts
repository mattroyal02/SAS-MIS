import { getMysqlConnection } from "common";
import { Request, Response } from "express";

const getBinMultipliers = async (_: Request, res: Response) => {
  const {
    models: { binMultiplier: BinMultiplier },
  } = getMysqlConnection();

  const data = await BinMultiplier.findAll();
  console.log("body", data);
  res.send({ data });
};

export default getBinMultipliers;
