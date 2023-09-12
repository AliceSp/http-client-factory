import type { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

  interface InterceptorOptions {
    store: any;
    refresh(refreshToken: string, params: AxiosRequestConfig): Promise<AxiosResponse<{ token: string }>>;
    prevRequest<T>(params: AxiosRequestConfig): Promise<T>;
  }

  export interface CustomlAxiosRequestConfig {
    handlerEnabled?: boolean;   
  } 
  
  export const requestSuccessInterceptor = (
    config: InternalAxiosRequestConfig,
    options?: Partial<InterceptorOptions>,
  ) : InternalAxiosRequestConfig => {
    const token = options?.store?.mainToken;
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  };
  
  export const requestErrorInterceptor = (error: any) => {
    return Promise.reject(error);
  }

  export const responseSuccessInterceptor = (axiosReponse: AxiosResponse) => {
    return axiosReponse;
  }

  export const responseErrorInterceptor = async (
    error: any,
    options?: Partial<InterceptorOptions>,
  ) : Promise<void> => {
    const originalRequest = error?.config;
    const status = error.response?.status;
    const store = options?.store;
    const refresh = options?.refresh ?? store.refresh;
    const prevRequest = options?.prevRequest ?? axios.request;

    if (status === 401 && originalRequest && !originalRequest?.headers.retry) {
      originalRequest.retry = true;
      const response  = await refresh(store.refreshToken, originalRequest);
      originalRequest.headers["Authorization"] = `Bearer ${response.data.token}`;
      return await prevRequest(originalRequest);
    }
  
    throw error;
  };