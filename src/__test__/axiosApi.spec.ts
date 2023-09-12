import { getUser } from "../AxiosApi";
import type { User } from "../AxiosApi";
import MockAxios from '../__mocks__/axios';
import fetchMock from '../__mocks__/fetch';
import { HTTPResponse } from "../interfaces/IHttpClient";

describe("Api", () => {
  describe("Axios : get User", () => {
    let result: HTTPResponse<User>;
    beforeAll(async () => {
      MockAxios.get.mockResolvedValue({
        data: {
          name: "User1",
        },
       statusCode: 200
      });
      result = await getUser(1);
    });

    it("should have created the client instance", () => {
      expect(MockAxios.create).toHaveBeenCalledWith({
        baseURL: "baseUrl",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
    });

    it("should call get user", () => {
      expect(MockAxios.get).toHaveBeenCalledWith("/user/1", {});
      expect(result.data).toEqual({
        name: "User1",
      });
    });
  });
});
