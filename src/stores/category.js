import { ref } from "vue";
import { defineStore } from "pinia";
import { getAllCategoryApi } from "@/apis/layout";

export const useCategoryStore = defineStore("category", () => {
  const globalCategoryData = ref([]);
  /*
    获取一级分类的数据
 */
  const getCategoryData = async () => {
    const res = await getAllCategoryApi();
    globalCategoryData.value = res.result;
  };

  return { globalCategoryData, getCategoryData };
});
