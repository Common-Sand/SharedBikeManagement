import { useTokenStore } from "@/stores/token";
import axios from "axios";
import { ElMessage } from "element-plus";
import qs from "qs";
import router from '@/router'

const request = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

request.interceptors.request.use(
  function (config) {
    if (config.method == "post") {
      config.data = qs.stringify(config.data);
    }
    let token = useTokenStore();
    if (token.token) {
      config.headers.Authorization = token.token;
    }
    return config;
  },
  function (error) {
    ElMessage.error("服务异常");
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    console.log(response);
    let result = response.data;
    if (result.code === 200) {
      ElMessage.success(result.message ? result.message : "请求成功");
      return result;
    } else {
      ElMessage.error(result.message);
      return Promise.reject(new Error(result.message));
    }
  },
  (error) => {
    if (error.response.status === 401) {
      ElMessage.error("请先登录！");
      router.push("/login");
    } else {
      ElMessage.error("服务异常");
    }

    return Promise.reject(error);
  }
);
export default request;
