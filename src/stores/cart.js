import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useCartStore = defineStore(
  "cart",
  () => {
    const cartList = ref([]);
    const isAll = computed(() => {
      // 找到是否存在未选中的数据 存在返回false 不存在(全选)返回true
      return cartList.value.find((e) => e.selected === false) ? false : true;
    });
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
    // 更新所有数据的selected为selectedValue
    const updateAllSelected = (selectedValue) => {
      cartList.value.forEach((e) => (e.selected = selectedValue));
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
