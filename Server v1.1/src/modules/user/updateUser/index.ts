import { getMysqlConnection, UserAttributes } from "common";
import { Request, Response } from "express";

const updateUser = async (
  req: Request<any, any, UserAttributes>,
  res: Response
) => {
  const { models } = getMysqlConnection();
  const user = await models.user.findByPk(req.params.id);
  if (user) {
    await user.update(req.body);
  }
  res.send(user);
};

export default updateUser;
