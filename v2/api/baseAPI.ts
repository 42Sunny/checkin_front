import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import ApiUtils from "./utilsAPI";

const API_URL = process.env.REACT_APP_API_URL;

export const VERSION_PATH = "v1";
export const makeAPIPath = (path: string) => `${VERSION_PATH}/${path}`;

export const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "X-42Cadet-Auth-Key": process.env.REACT_APP_X_42CADET_AUTH,
  },
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

class Api {
  static baseUrl = API_URL;

  static get<T = any>(
    url: string,
    queryParams: Record<string, any> = {},
    config?: AxiosRequestConfig,
  ) {
    return instance.get<T>(url + ApiUtils.convertObjToQueryParams(queryParams), {
      ...instance.defaults,
      ...config,
    });
  }

  static post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return instance.post<T>(url, data, {
      ...instance.defaults,
      ...config,
    });
  }
}
export default Api;
