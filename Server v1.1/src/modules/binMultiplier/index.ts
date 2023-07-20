import { Express } from "express";

import getBinMultiplier from "./getBinMultiplier";
import getBinMultipliers from "./getBinMultipliers";
import updateBinMultiplier from "./updateBinMultiplier";

const routeBinMultiplier = (app: Express) => {
  app.get("/bins", getBinMultipliers);
  app.get("/bins/:id", getBinMultiplier);
  app.put("/products/:id", updateBinMultiplier);
};

export {
  getBinMultiplier,
  getBinMultipliers,
  routeBinMultiplier,
  updateBinMultiplier,
};
