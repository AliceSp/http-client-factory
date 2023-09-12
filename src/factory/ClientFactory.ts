import { IHTTPClient, HTTPClientParams } from '../interfaces/IHttpClient';
import { AxiosClient } from '../axios/client';
import { FetchClient } from '../fetch/client'

export class HTTPClientFactory {

	private params: HTTPClientParams;
	private type: string;

    constructor(params: HTTPClientParams, type: string) {
      this.params = params;
      this.type = type;
    }

	public static build( params: HTTPClientParams , type: string ): HTTPClientFactory {
		return new HTTPClientFactory( params , type);
	}

	public create(): IHTTPClient {
		if (this.type === 'axios') {
			return new AxiosClient( this.params );
		}
		//TODO: ADD Fetch

		return new FetchClient( this.params );
	}
}