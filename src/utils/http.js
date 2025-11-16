import axios from "axios";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { useUserStore } from "@/stores/user";
import router from "@/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 20000,
});

// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    NProgress.start();
    const userStore = useUserStore();
    const token = userStore.userInfo.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (e) => Promise.reject(e)
);

// axios响应式拦截器
httpInstance.interceptors.response.use(
  (res) => {
    NProgress.done();
    return res.data;
  },
  (e) => {
    const userStore = useUserStore();
    ElMessage.warning(e.response.data.message);
    // 401报错
    console.log(e);
    if (e.response?.status === 401) {
      userStore.ClearUserInfo();
      router.push("/login");
    }
    NProgress.done();
    return Promise.reject(e);
  }
);

export default httpInstance;
