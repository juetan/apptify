import { Api } from "../service";

/**
 * 自定义扩展api
 */
class Service extends Api<unknown> {}

/**
 * api实例
 */
const api = new Service({
  baseURL: "http://127.0.0.1:3030",
});

/**
 * 请求拦截器
 */
api.instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("r e", error);
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
api.instance.interceptors.response.use(
  (res) => {
    const { data } = res;
    if (data?.code && data.code !== 2000) {
      return Promise.reject(res);
    }
    return res;
  },
  (error) => {
    if (error.request) {
      console.log("request error", error.request);
    }
    if (error.response) {
      console.log("response error", error.response);
    }
    return Promise.reject(error);
  }
);

export { api };
