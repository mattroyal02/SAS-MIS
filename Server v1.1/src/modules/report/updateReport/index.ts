import { getMysqlConnection } from "common";
import { Request, Response } from "express";

const updateReport = async (req: Request, res: Response) => {
  const { models } = getMysqlConnection();
  const report = await models.report.findByPk(req.params.id);
  if (report) {
    await report.update(req.body);
  }
  res.send(report);
};

export default updateReport;
