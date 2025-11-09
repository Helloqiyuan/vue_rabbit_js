//createRouter:创建router实例对象
//createwebHistory:创建history模式的路由
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login/index.vue";
import Layout from "@/views/Layout/index.vue";
import Home from "@/views/Home/index.vue";
import Category from "@/views/Category/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      redirect: "/home",
      component: Layout,
      children: [
        {
          path: "/home",
          name: "home",
          component: Home,
        },
        {
          path: "/category/:id",
          name: "category",
          component: Category,
          /*
            使得路径参数id能让子组件通过defineProps获得，
            不写这个就需要获取useRoute去拿到params再获取到id
          */
          props: true,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

export default router;
