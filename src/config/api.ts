import axios, { type AxiosRequestConfig } from "axios";
import { API_KEY, API_BASE_URL } from "../constant/constant";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-cg-demo-api-key": API_KEY,
  },
});

const apiService = {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<{ data: T; status: number }> =>
    api.get<T>(url, config).then((res) => ({
      data: res.data,
      status: res.status,
    })),

  post: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<{ data: T; status: number }> =>
    api.post<T>(url, data, config).then((res) => ({
      data: res.data,
      status: res.status,
    })),

  put: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<{ data: T; status: number }> =>
    api.put<T>(url, data, config).then((res) => ({
      data: res.data,
      status: res.status,
    })),

  delete: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<{ data: T; status: number }> =>
    api.delete<T>(url, config).then((res) => ({
      data: res.data,
      status: res.status,
    })),

  patch: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<{ data: T; status: number }> =>
    api.patch<T>(url, data, config).then((res) => ({
      data: res.data,
      status: res.status,
    })),
};

export default apiService;
