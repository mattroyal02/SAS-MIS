import { getMysqlConnection } from "common";
import { Request, Response } from "express";

const getPreviousMilla = async (req: Request, res: Response) => {
  const {
    //        ↓↓↓  table name here
    models: { mill_a: Milla },
  } = getMysqlConnection();
  const milla = await Milla.findOne({
    order: [["id", "DESC"]], // Replace 'id' with the date column if you want to sort by date instead
  });
  res.send({ data: milla });
};

export default getPreviousMilla;
