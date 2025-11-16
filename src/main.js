// import './assets/main.css'
// 引入自定义css样式
import "@/styles/common.scss";
import "@/styles/nprogress.scss"
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { lazyPlugin } from "./directives";
import {componentPlugin } from './components'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount("#app");


