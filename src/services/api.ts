import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8081",
  // process.env.REACT_API,
});
