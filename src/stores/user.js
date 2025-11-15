import { ref } from "vue";
import { defineStore } from "pinia";
import { loginApi } from "@/apis/user";
import { useCartStore } from "./cart";
export const useUserStore = defineStore(
  "user",
  () => {
    const userInfo = ref({});
    const cartStore = useCartStore();
    const getUserInfo = async ({ account, password }) => {
      const res = await loginApi({ account, password });
      userInfo.value = res.result;
      console.log("(Pinia)登录返回结果:", res.result);
    };
    const ClearUserInfo = () => {
      userInfo.value = {};
      cartStore.clearCartList();
    };
    return {
      userInfo,
      getUserInfo,
      ClearUserInfo,
    };
  },
  {
    persist: true,
  }
);
