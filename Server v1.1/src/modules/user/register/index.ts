import { getMysqlConnection } from "common";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { hashSync } from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const register = async (req: Request, res: Response) => {
  const { models } = getMysqlConnection();
  const input = { ...req.body, password: hashSync(req.body.password, 10) };
  let userExist = await models.user.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (userExist) {
    return res.send({
      status: "FAILURE",
      message: "user already exist login instead",
    });
  }
  const result = await models.user.create(input);
  const secretKey: string = process.env.ACCESS_TOKEN_SECRET || "";
  const token = jwt.sign(result.get(), secretKey);
  return res.send({ status: "SUCCESS", accessToken: token });
};

export default register;

/*
✅ get the payload from the POST 
✅ take the password field from the payload and encrypt it, then store that value in the password field in the database
✅ create the user
✅get the user object from the database
✅make json web token of the user object
✅send that back as a response

*/
