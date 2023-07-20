"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCodeFromToken = void 0;
const removeCodeFromToken = (token) => {
    if (!token)
        return;
    const { code, ...rest } = token;
    return rest;
};
exports.removeCodeFromToken = removeCodeFromToken;
