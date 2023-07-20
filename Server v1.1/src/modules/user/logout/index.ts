import { compareSync } from "bcrypt";
import { getMysqlConnection } from "common";
import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
dotenv.config();

const logout = async (req: Request, res: Response) => {
  const { models } = getMysqlConnection();
  const userEmail = req.body.username;

  const user = await models.user.findOne({
    where: { username: userEmail },
  });

  if (!user) {
    return res.send({
      status: "FAILED",
      message: "Username and/or password incorrect !",
    });
  } else {
    let isPasswordCorrect = compareSync(req.body.password, user.password);
    if (isPasswordCorrect) {
      const secretKey: string = process.env.ACCESS_TOKEN_SECRET || "";
      let token = jwt.sign({ id: user.id, username: user.username }, secretKey);
      return res.send({
        status: "SUCCESS",
        message: "Signin successful",
        token,
      });
    } else {
      return res.send({
        status: "FAILED",
        message: "Username and/or password incorrect !",
      });
    }
  }
};

export default logout;
