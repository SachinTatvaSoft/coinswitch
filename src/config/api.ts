import axios, { type AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-cg-demo-api-key": process.env.API_KEY,
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
