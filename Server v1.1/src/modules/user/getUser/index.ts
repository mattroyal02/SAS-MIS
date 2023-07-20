import { getMysqlConnection, UserAttributes } from "common";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

const getUser = async (req: Request, res: Response) => {
  const {
    // from database3 to product belowe here
    // change this ↓↓↓
    models: { user: User },
  } = getMysqlConnection();
  const id = req.params.id;
  if (id) {
    const customer = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });
    return res.send(customer);
  }
  const token = req.headers.authorization?.replace("Bearer ", "");
  console.log("token :>> ", token);
  const decoded = verify(token || "", process.env.ACCESS_TOKEN_SECRET || "") as
    | UserAttributes
    | undefined;
  if (decoded) {
    const me = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });
    return res.send(me);
  }
};

export default getUser;
