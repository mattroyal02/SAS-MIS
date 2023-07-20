import { getMysqlConnection } from "common";
import { Request, Response } from "express";

const getUsers = async (_: Request, res: Response) => {
  const { models } = getMysqlConnection();

  const data = await models.user.findAll({
    where: { role: "client" },
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });

  res.send({ data });
};

export default getUsers;
