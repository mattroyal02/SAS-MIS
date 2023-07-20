import { getMysqlConnection } from "common";
import dotenv from "dotenv";
import { Request, Response } from "express";
dotenv.config();

const deleteProduct = async (req: Request, res: Response) => {
  const { models } = getMysqlConnection();
  const productId = req.params.id;

  try {
    // Find the product by its ID
    const product = await models.product.findOne({ where: { id: productId } });

    if (!product) {
      return res.status(404).json({
        status: "ERROR",
        message: "Product not found",
      });
    }

    // Delete the product
    await product.destroy();

    return res.json({
      status: "SUCCESS",
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      status: "ERROR",
      message: "Failed to delete product",
    });
  }
};

export default deleteProduct;
