import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { insertCartApi, getLatestCartApi, deleteCartApi } from "@/apis/cart";
import { useUserStore } from "./user";
export const useCartStore = defineStore(
  "cart",
  () => {
    const cartList = ref([]);
    const isAll = computed(() => {
      // 找到是否存在未选中的数据 存在返回false 不存在(全选)返回true
      return cartList.value.find((e) => e.selected === false) ? false : true;
    });
    const addCart = async (cart) => {
      const userStore = useUserStore();
      const token = userStore.userInfo.token;
      // 有token就把购物车加入到服务器
      if (token) {
        await insertCartApi({ skuId: cart.skuId, count: cart.count });
        const res = await getLatestCartApi();
        cartList.value = res.result;
      } else {
        // 没有token暂时把数据存到本地pinia
        const item = cartList.value.find((e) => e?.skuId === cart.skuId);
        if (item) {
          item.count += cart.count;
        } else {
          cartList.value.push(cart);
        }
      }
    };
    // 通过skuId更新selected字段
    const updateSelected = (skuId, selectedValue) => {
      const res = cartList.value.find((e) => e.skuId === skuId);
      if (res) {
        res.selected = selectedValue;
        return;
      }
      console.log("(cartPinia)未找到", skuId, "对应的数据");
    };
    // 更新所有数据的selected为selectedValue
    const updateAllSelected = (selectedValue) => {
      cartList.value.forEach((e) => (e.selected = selectedValue));
    };
    // 根据skuId删除数据
    const deleteCartByskuId = async (skuId) => {
      const userStore = useUserStore();
      const token = userStore.userInfo.token;
      const targetCartName = cartList.value.filter((e) => e.skuId === skuId)[0].name;
      if (token) {
        await deleteCartApi([skuId]);
        const res = await getLatestCartApi();
        cartList.value = res.result;
      } else {
        cartList.value = cartList.value.filter((e) => e.skuId !== skuId);
      }
      ElMessage({
        message: `已删除 ${targetCartName}`,
        type: "success",
        duration: 6000,
      });
    };
    // 清空数据列表
    const clearCartList = () => {
      cartList.value = [];
    };
    // 获取总共有多少件商品 sum(count)
    const getTotalCount = () => {
      return cartList.value.reduce((a, c) => a + c.count, 0);
    };
    // 获取购物车内所有商品的总价格 sum(e.price * e.count)
    const getTotalPrice = () => {
      return cartList.value.reduce((a, c) => a + c.price * c.count, 0).toFixed(2);
    };
    // 获取购物车内选中商品的总数量 selected == true => sum(count)
    const getSelectedCount = () => {
      return cartList.value.filter((e) => e.selected === true).reduce((a, c) => a + c.count, 0);
    };
    // 获取选中商品的总价格 selected == true => sum(e.price * e.count)
    const getSelectedPrice = () => {
      return cartList.value
        .filter((e) => e.selected === true)
        .reduce((a, c) => a + c.price * c.count, 0)
        .toFixed(2);
    };

    return {
      cartList,
      isAll,
      addCart,
      updateSelected,
      updateAllSelected,
      deleteCartByskuId,
      clearCartList,
      getTotalCount,
      getSelectedPrice,
      getTotalPrice,
      getSelectedCount,
    };
  },
  {
    persist: true,
  }
);
