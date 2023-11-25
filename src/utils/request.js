import axios from "axios";
import { serverUrl } from "./tools";

const instanceAxios = axios.create({
  baseURL: serverUrl,
  timeout: 3000,
});

export const get = (url, params = {}) => instanceAxios.get(url, { params });
export const post = (url, params = {}) => instanceAxios.post(url, { params });
export const myDelete = (url, params = {}) =>
  instanceAxios.delete(url, { params });
export const update = (url, params = {}) =>
  instanceAxios.update(url, { params });
