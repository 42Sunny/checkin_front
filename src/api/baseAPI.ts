import axios, { AxiosError, AxiosResponse } from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const VERSION_PATH = "v3";
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
