import { createApp } from "vue";
import { createPinia } from "pinia";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import router from "./router";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import "@/assets/css/global.css";
import "element-plus/dist/index.css";
import { createPersistedState } from "pinia-persistedstate-plugin";
import ECharts from "vue-echarts";
axios.defaults.baseURL = "/api";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.component("v-chart", ECharts);
const persist = createPersistedState();
const store = createPinia();
store.use(persist);
app.config.globalProperties.rqst = axios;
app.use(store);
app.use(VueAxios, axios);
app.use(router);

app.mount("#app");
