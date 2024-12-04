import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const API_BASE_URL = `${process.env.API_BASE_URL}`;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

// interface ErrorResponse {
//   title?: string | null;
//   status?: number | null;
//   detail?: string | null;
//   errors?: {
//     message?: string | null;
//   }[];
// }

const GET = async <T, D>(
  path: string,
  config?: AxiosRequestConfig<D>
) => {
  return axiosInstance.get<T, AxiosResponse<T | null | undefined>, D>(
    path,
    config
  );
};

const POST = async <T, D>(
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

const PUT = async <T, D>(
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

const DELETE = async <T, D>(
  path: string,
  config?: AxiosRequestConfig<D>
) => {
  return axiosInstance.delete<T, AxiosResponse<T | null | undefined>, D>(
    path,
    config
  );
};

export { GET, POST, PUT, DELETE };
