import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL_INTERNAL}`;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

interface ErrorResponse {
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  errors?: {
    message?: string | null;
  }[];
}

export const GET = async <T, D>(
  path: string,
  config?: AxiosRequestConfig<D>
) => {
  return axiosInstance.get<T, AxiosResponse<T | null | undefined>, D>(
    path,
    config
  );
};

export const POST = async <T, D>(
  path: string,
  payload?: D,
  config?: AxiosRequestConfig<D>
) => {
  return axiosInstance.post<T, AxiosResponse<T | null | undefined>, D>(
    path,
    payload,
    config
  );
};

export const PUT = async <T, D>(
  path: string,
  payload?: D,
  config?: AxiosRequestConfig<D>
) => {
  return axiosInstance.put<T, AxiosResponse<T | null | undefined>, D>(
    path,
    payload,
    config
  );
};

export const DELETE = async <T, D>(
  path: string,
  config?: AxiosRequestConfig<D>
) => {
  return axiosInstance.delete<T, AxiosResponse<T | null | undefined>, D>(
    path,
    config
  );
};
