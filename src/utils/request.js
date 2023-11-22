import axios from "axios";
import { serverUrl } from "./tools";

const instanceAxios = axios.create({
  baseURL: serverUrl,
  timeout: 3000,
});

export const get = (url, params = {}) => instanceAxios.get(url, { params });
