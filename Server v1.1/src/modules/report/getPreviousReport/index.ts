import { getMysqlConnection } from "common";
import { Request, Response } from "express";

const getPreviousReport = async (req: Request, res: Response) => {
  const {
    //        ↓↓↓  table name here
    models: { report: Report },
  } = getMysqlConnection();
  const report = await Report.findOne({
    order: [["id", "DESC"]], // Replace 'id' with the date column if you want to sort by date instead
  });
  res.send({ data: report });
};

export default getPreviousReport;
