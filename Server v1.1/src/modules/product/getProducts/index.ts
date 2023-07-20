import { getMysqlConnection } from "common";
import { Request, Response } from "express";

const getProducts = async (_: Request, res: Response) => {
  const {
    models: { product: Product },
  } = getMysqlConnection();

  const data = await Product.findAll();
  console.log("body", data);
  res.send({ data });
};

export default getProducts;
