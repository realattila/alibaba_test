/* eslint-disable  */
import axios from "axios";

if (!process.env.API_BASE_URL) {
  throw Error("API_BASE_URL in .env required");
}

const API = axios.create({ baseURL: process.env.API_BASE_URL });

export default API;
