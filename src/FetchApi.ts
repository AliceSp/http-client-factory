import { HTTPClientFactory } from "./factory/ClientFactory"

export interface User {
  name: string,
}

const client = HTTPClientFactory.build({
  baseURL: 'baseUrl',
  headers :{
   "Content-Type": "application/json",
  },
  withCredentials: true
  }, 'fetch')
    .create();

export async function getUser(id: number) {
  return await client.get<User>('/user/'+ id, {})
}

