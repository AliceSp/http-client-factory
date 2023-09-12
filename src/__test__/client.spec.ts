
import {
  responseErrorInterceptor,
  requestSuccessInterceptor,
} from "../axios/interceptors";

const mockStore = () => {
  const store: any = {
      mainToken: "$mainToken",
      refreshToken: "$refreshToken",
      refresh: jest.fn().mockReturnValue({ data: { token: "$refreshToken" } }),
  };
  return store;
};

describe("Axios", () => {
  it("should add refresh token to header", async () => {
    const config: any = { headers: {} };
    const store = mockStore();
    const token = '$mainToken';

    await requestSuccessInterceptor(config, 
      { store: store }
    );
    expect(config.headers?.Authorization).toEqual(`Bearer ${token}`);
  });
  it("should refresh token when 401", async () => {
    const store = mockStore();
    const token = '$newToken';
    const refresh = jest.fn().mockReturnValue({ data: { token } });
    const prevRequest = jest.fn().mockReturnValue('sucess');
    const err = {
      response: {
        status: 401,
      },
      config: {
        headers: {
          Authorization: "",
        },
      },
    };
    const result = await responseErrorInterceptor(err, {
      store,
      refresh,
      prevRequest,
    });
    expect(err.config.headers.Authorization).toEqual(`Bearer ${token}`);
    expect(result).toBeTruthy();
  });
});