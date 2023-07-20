import { getMysqlConnection } from "common";
import { Request, Response } from "express";

const getProduct = async (req: Request, res: Response) => {
  const {
    //        ↓↓↓  table name here
    models: { product: Product },
  } = getMysqlConnection();
  const product = await Product.findByPk(req.params.id);
  res.send({ data: product });
};

export default getProduct;
