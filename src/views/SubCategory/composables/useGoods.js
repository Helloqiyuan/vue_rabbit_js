// 商品列表渲染业务代码
import { onMounted, ref } from "vue";
import { getGoodsApi } from "@/apis/subCategory";
export const useGoods = (reqParams) => {
  const GoodsData = ref([]);
  const getGoodsData = async (params) => {
    const res = await getGoodsApi(params);
    GoodsData.value = res.result.items;
  };
  onMounted(() => {
    getGoodsData(reqParams.value);
  });
  return {
    GoodsData,
    getGoodsData,
  };
};
