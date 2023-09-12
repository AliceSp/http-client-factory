import { getUser } from "../FetchApi";
import type { User } from "../FetchApi";
import fetchMock from '../__mocks__/fetch';
import { HTTPResponse } from "../interfaces/IHttpClient";

describe("Api", () => {

  

  describe("Fetch : get User", () => {
    let result: HTTPResponse<User>;
    beforeAll(async () => {
      fetchMock.mockResponseOnce(JSON.stringify({  name: "User1" }));
      result = await getUser(1);
    });

    it("should call get user", () => {
      expect(fetchMock).toHaveBeenCalledWith("/user/1", {});
      expect(result.data).toEqual({
        name: "User1",
      });
    });
  });
});
