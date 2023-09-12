export enum HTTPMethods {
    post = 'POST',
    get = 'GET',
    delete = 'DELETE',
    put = 'PUT',
    patch = 'PATCH'
}

export class HTTPResponse< T = any > {
	public readonly statusCode: number;
	public readonly headers: any;
	public data: T;
	public constructor( statusCode: number, headers: any, data: T ) {
		this.statusCode = statusCode;
		this.headers = headers;
		this.data = data;
	}
}

export interface HTTPClientParams {
    baseURL: string;
    headers: object;
    withCredentials: boolean; 
  }

export interface IHTTPClient {
    params: HTTPClientParams;
    get< T = any >( path: string, params?: any ): Promise< HTTPResponse< T > >;
	post< T = any >( path: string, data?: any ): Promise< HTTPResponse< T > >;
	put< T = any >( path: string, data?: any ): Promise< HTTPResponse< T > >;
	patch< T = any >( path: string, data?: any ): Promise< HTTPResponse< T > >;
	delete< T = any >( path: string, data?: any ): Promise< HTTPResponse< T > >;
}