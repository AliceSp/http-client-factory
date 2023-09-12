import { IHTTPClient , HTTPResponse, HTTPClientParams } from "../interfaces/IHttpClient";

export class FetchClient implements IHTTPClient {
  
    params: HTTPClientParams;
  
    constructor(params: HTTPClientParams) {
        this.params = params;
    }
  
    public async get<T>(url: string, config?: object): Promise<HTTPResponse<T>> {
      const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return { statusCode: response.status, headers: response.headers, data: await response.json() };
    }

    public async delete<T>(url: string, config: any): Promise<HTTPResponse<T>> {
        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return { statusCode: response.status, headers: response.headers, data: await response.json() };
    }
  
    public async post<T>(url: string, config?: object): Promise<HTTPResponse<T>> {
        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return { statusCode: response.status, headers: response.headers, data: await response.json() };
    }
  
    public async put<T>(url: string, config: any): Promise<HTTPResponse<T>> {
        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return { statusCode: response.status, headers: response.headers, data: await response.json() };
    }
  
    public async patch<T>(url: string, config: any): Promise<HTTPResponse<T>> {
        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return { statusCode: response.status, headers: response.headers, data: await response.json() };
    }
  }
  