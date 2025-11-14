import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useCartStore = defineStore(
  "cart",
  () => {
    const cartList = ref([]);
    const addCart = (cart) => {
      const item = cartList.value.find((e) => e?.skuId === cart.skuId);
      if (item) {
        item.count += cart.count;
      } else {
        cartList.value.push(cart);
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
    // 根据skuId删除数据
    const deleteCartByskuId = (skuId) => {
      ElMessage({
        message: `已删除 ${cartList.value.find((e) => e.skuId === skuId).name}`,
        type: "success",
        duration: 5000,
      });

      cartList.value = cartList.value.filter((e) => e.skuId !== skuId);
    };
    // 清空数据列表
    const clearCartList = () => {
      cartList.value = [];
    };
    const getTotalCount = () => {
      let res = 0;
      cartList.value.forEach((e) => (res += e.count));
      return res;
    };
    const getTotalPrice = () => {
      let res = 0;
      cartList.value.forEach((e) => (res += Number(e.price) * Number(e.count)));
      return res;
    };
    const getTotalSelected = () => {
      let res = 0;
      cartList.value.forEach((e) => (e.selected ? (res += e.count) : ""));
      return res;
    };
    return {
      cartList,
      addCart,
      updateSelected,
      deleteCartByskuId,
      clearCartList,
      getTotalCount,
      getTotalPrice,
      getTotalSelected,
    };
  },
  {
    persist: true,
  }
);
