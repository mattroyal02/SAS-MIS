import { getMysqlConnection } from "common";
import dotenv from "dotenv";
import { Request, Response } from "express";
dotenv.config();

const addReport = async (req: Request, res: Response) => {
  const { models } = getMysqlConnection();
  const input = req.body;

  const results = await models.report.create(input);
  console.log(results);

  return res.send({
    status: "SUCCESS",
    Message: "Successfully added the Product",
    data: results,
  });
};

export default addReport;
