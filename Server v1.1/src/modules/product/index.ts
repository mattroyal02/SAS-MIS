import { Express } from "express";

import addProduct from "./addProduct";
import deleteProduct from "./deleteProduct/intex";
import getProduct from "./getProduct";
import getProducts from "./getProducts";
import updateProduct from "./updateProduct";

const routeProduct = (app: Express) => {
  app.post("/addProduct", addProduct);
  app.get("/products", getProducts);
  app.get("/products/:id", getProduct);
  app.put("/products/:id", updateProduct);
  app.delete("/products/:id", deleteProduct);
};

export {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  routeProduct,
  updateProduct,
};
