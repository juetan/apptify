import { Api } from "../service";
import { useRequest } from "./use-request";

class Service extends Api<any> {
  use = useRequest;
}

const api = new Service({
  baseURL: "http://127.0.0.1:3030",
});

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

api.instance.interceptors.response.use(
  (res) => {
    const { data } = res;
    console.log("res", res);
    if (data?.code && data.code !== 2000) {
      return Promise.reject(data);
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
