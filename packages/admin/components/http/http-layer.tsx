import Axios from 'axios';
import { configure as configureAxios } from "axios-hooks";

export const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use((cfg) => {
  if (
    cfg.method === 'POST' ||
    cfg.method === 'post' ||
    cfg.method === 'PUT' ||
    cfg.method === 'put'
  ) {
    cfg.headers['Content-Type'] = 'application/json';
  }
  if (cfg.params?.page) {
    cfg.params.page--;
  }
  return cfg;
});

configureAxios({ axios: axiosInstance });

export const HttpLayer = (props) => {

  return props.children;
};
