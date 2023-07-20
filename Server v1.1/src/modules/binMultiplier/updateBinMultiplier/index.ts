import { BinMultiplierAttributes, getMysqlConnection } from "common";
import { Request, Response } from "express";

const updateBinMultiplier = async (
  req: Request<any, any, BinMultiplierAttributes>,
  res: Response
) => {
  const { models } = getMysqlConnection();
  const binMultiplier = await models.binMultiplier.findByPk(req.params.id);
  if (binMultiplier) {
    await binMultiplier.update(req.body);
  }
  res.send(binMultiplier);
};

export default updateBinMultiplier;
