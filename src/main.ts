import { createApp } from "vue";
import { createPinia } from "pinia";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import "@/assets/css/global.css";
import "element-plus/dist/index.css";

axios.defaults.baseURL = "/api";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
const store = createPinia();
app.config.globalProperties.rqst = axios;
app.use(createPinia());
app.use(VueAxios, axios);
app.use(router);

app.mount("#app");
