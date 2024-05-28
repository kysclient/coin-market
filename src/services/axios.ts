import axios, { AxiosRequestConfig } from "axios";

interface AxiosConfig extends AxiosRequestConfig {
  xsrfHeaderName: string;
  xsrfCookieName: string;
}

const axiosConfig: AxiosConfig = {
  baseURL: import.meta.env.VITE_BASE_URL as string,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
  xsrfHeaderName: "X-CSRFTOKEN",
  xsrfCookieName: "csrftoken",
};

export const client = axios.create(axiosConfig);
