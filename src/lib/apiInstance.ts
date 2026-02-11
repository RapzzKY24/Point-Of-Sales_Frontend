import axios from "axios";

export const ApiInstace = axios.create({
  baseURL: "http://localhost:2000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
