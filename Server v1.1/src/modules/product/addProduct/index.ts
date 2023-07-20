import { getMysqlConnection } from "common";
import dotenv from "dotenv";
import { Request, Response } from "express";
dotenv.config();

const addProduct = async (req: Request, res: Response) => {
  const { models } = getMysqlConnection();
  const input = req.body;

  const results = await models.product.create(input);
  console.log(results);

  return res.send({
    status: "SUCCESS",
    Message: "Successfully added the Product",
    data: results,
  });
};

export default addProduct;
