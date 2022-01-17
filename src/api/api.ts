import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import * as Sentry from "@sentry/react";
import ApiUtils from "./apiUtils";

const apiUrl = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    "X-42Cadet-Auth-Key": process.env.REACT_APP_X_42CADET_AUTH,
  },
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(error.response?.data);
  },
);

class Api {
  static baseUrl = apiUrl;

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
