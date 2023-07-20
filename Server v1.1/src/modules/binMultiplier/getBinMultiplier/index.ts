import { getMysqlConnection } from "common";
import { Request, Response } from "express";

const getBinMultiplier = async (req: Request, res: Response) => {
  const {
    //        ↓↓↓  table name here
    models: { binMultiplier: BinMultiplier },
  } = getMysqlConnection();
  const binMultiplier = await BinMultiplier.findByPk(req.params.id);
  res.send({ data: binMultiplier });
};

export default getBinMultiplier;
