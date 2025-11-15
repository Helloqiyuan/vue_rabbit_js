//createRouter:创建router实例对象
//createwebHistory:创建history模式的路由
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login/index.vue";
import Layout from "@/views/Layout/index.vue";
import Home from "@/views/Home/index.vue";
import Category from "@/views/Category/index.vue";
import SubCategory from "@/views/SubCategory/index.vue";
import Detail from "@/views/Detail/index.vue";
import CartList from "@/views/CartList/index.vue";
import CheckOut from "@/views/CheckOut/index.vue";
import Pay from "@/views/Pay/index.vue";
import Paycallback from "@/views/Pay/paycallback.vue";
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
          path: "home",
          name: "home",
          component: Home,
        },
        {
          path: "category/:id",
          name: "category",
          component: Category,
          /*
            使得路径参数id能让子组件通过defineProps获得，
            不写这个就需要获取useRoute去拿到params再获取到id
          */
          props: true,
        },
        {
          path: "category/sub/:id",
          name: "subCategory",
          component: SubCategory,
          props: true,
        },
        {
          path: "detail/:id",
          name: "datail",
          component: Detail,
          props: true,
        },
        {
          path: "cartlist",
          name: "cartList",
          component: CartList,
        },
        {
          path: "checkout",
          name: "checkout",
          component: CheckOut,
        },
        {
          path: "pay",
          name: "pay",
          component: Pay,
          props(route) {
            return route.query;
          },
        },
        {
          path: "paycallback",
          name: "paycallback",
          component: Paycallback,
          props(route) {
            console.log(route.query);
            return route.query;
          },
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 在按下 后退/前进 按钮时不会滚动到顶部
    // if (savedPosition) {
    //   return savedPosition;
    // } else {
    //   return {
    //     top: 0,
    //   };
    // }
    return {
      top: 0,
    };
  },
});

export default router;
