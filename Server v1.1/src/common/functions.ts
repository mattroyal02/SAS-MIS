import { TokenAttributes } from "common";

const removeCodeFromToken = (token?: TokenAttributes) => {
  if (!token) return;
  const { code, ...rest } = token;
  return rest;
};

export { removeCodeFromToken };
