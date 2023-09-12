import axios from "axios";
import type { AxiosInstance } from "axios";
import { responseSuccessInterceptor, responseErrorInterceptor , requestSuccessInterceptor, requestErrorInterceptor } from "./interceptors";
import { IHTTPClient , HTTPResponse, HTTPClientParams } from "../interfaces/IHttpClient";

export class AxiosClient implements IHTTPClient {

  private axiosInstance: AxiosInstance;

  params: HTTPClientParams;

  constructor(params: HTTPClientParams) {
    this.params = params;
    this.axiosInstance = axios.create( params )
  
    this.axiosInstance.interceptors.response.use(
      responseSuccessInterceptor,
      responseErrorInterceptor,
    );
    this.axiosInstance.interceptors.request.use(
      requestSuccessInterceptor,
      requestErrorInterceptor
    );
  }

  public async get<T>(url: string, config?: object): Promise<HTTPResponse<T>> {
    return this.axiosInstance.get(url, config)
  }

  public async delete<T>(url: string, config: any): Promise<HTTPResponse<T>> {
    return this.axiosInstance.delete(url, config)
  }

  public async post<T>(url: string, config?: object): Promise<HTTPResponse<T>> {
    return this.axiosInstance.post(url, config)
  }

  public async put<T>(url: string, config: any): Promise<HTTPResponse<T>> {
    return this.axiosInstance.put(url, config)
  }

  public async patch<T>(url: string, config: any): Promise<HTTPResponse<T>> {
    return this.axiosInstance.patch(url, config)
  }
}
