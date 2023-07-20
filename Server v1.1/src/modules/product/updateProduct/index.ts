import { getMysqlConnection, ProductAttributes } from "common";
import { Request, Response } from "express";

const updateProduct = async (
  req: Request<any, any, ProductAttributes>,
  res: Response
) => {
  const { models } = getMysqlConnection();
  const product = await models.product.findByPk(req.params.id);
  if (product) {
    await product.update(req.body);
  }
  res.send(product);
};

export default updateProduct;
