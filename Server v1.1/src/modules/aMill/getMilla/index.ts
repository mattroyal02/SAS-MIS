import { getMysqlConnection } from "common";
import { Request, Response } from "express";

const getMilla = async (req: Request, res: Response) => {
  const {
    //        ↓↓↓  table name here
    models: { mill_a: Milla },
  } = getMysqlConnection();
  const millaById = await Milla.findByPk(req.params.id);
  res.send({ data: millaById });
};

export default getMilla;
