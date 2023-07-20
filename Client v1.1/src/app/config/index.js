import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL || "http://localhost:4050",
});

export default api;
