import { compareSync } from "bcrypt";
import { getMysqlConnection } from "common";
import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
dotenv.config();

const login = async (req: Request, res: Response) => {
  const { models } = getMysqlConnection();
  const userEmail = req.body.email;

  const user: any = await models.user.findOne({
    where: { email: userEmail },
  });

  if (!user) {
    return res.send({
      status: "FAILED",
      message: "Email and/or password incorrect !",
    });
  } else {
    let isPasswordCorrect = compareSync(req.body.password, user.password);
    if (isPasswordCorrect) {
      const secretKey: string = process.env.ACCESS_TOKEN_SECRET || "";
      let token = jwt.sign(
        {
          id: user.id,
          firstname: user.firstname,
          surname: user.surname,
          title: user.title,
          email: user.email,
          phoneNumber: user.phoneNumber,
          jobTitle: user.jobTitle,
          companyname: user.companyName,
        },
        secretKey
      );

      return res.send({
        status: "SUCCESS",
        message: "Signin successful",
        token,
        user,
      });
    } else {
      return res.send({
        status: "FAILED",
        message: "Email and/or password incorrect !",
      });
    }
  }
};

export default login;
