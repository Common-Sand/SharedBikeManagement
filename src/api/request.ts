import axios from "axios";
// import { AxiosRequestHeaders} from "axios";
import { useTokenAndRoleStore } from "@/stores/tokenAndRole";
import { ElMessage } from "element-plus";
// import { useTokenAndRoleStore } from '@/stores/tokenAndRole'
const request = axios.create({
  baseURL: "",
  timeout: 5000,
});

// 配置请求拦截器.  config 代表着每次请求的配置对象
request.interceptors.request.use((config) => {
  // 以前可能会没有 headers, 可能不要也行
  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders;
  }
  const store = useTokenAndRoleStore(); // 2.获取token
  // 把access_token添加到每个请求头信息中
  config.headers.Authorization = store.tokenAndRole.token;

  return config;
});
export default request;
