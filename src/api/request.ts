import axios from "axios";
import { ElMessage } from "element-plus";
import qs from "qs";

const request = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

request.interceptors.request.use(
  function (config) {
    if (config.method == "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  function (result) {
    return result.data;
  },
  function (error) {
    ElMessage.error("服务异常");
    return Promise.reject(error);
  }
);

export default request;
