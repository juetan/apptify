import { Api } from "./service";
import { useRequest } from "./use-request";

declare interface api {
  use: typeof useRequest;
}

class Service extends Api<any> {
  use = useRequest;
}

const api = new Service({
  baseURL: "http://127.0.0.1:3030",
});

api.use(api.api.selectUsers);

export { api };
