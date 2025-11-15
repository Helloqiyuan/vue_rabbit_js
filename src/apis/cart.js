import httpInstance from "@/utils/http";

// 插入一条新数据到服务器
export const insertCartApi = ({ skuId, count }) => {
  return httpInstance({
    url: "/member/cart",
    method: "POST",
    data: {
      skuId,
      count
    },
  });
};

// 获取最新的购物车列表
export const getLatestCartApi = () => {
  return httpInstance({
    url: "/member/cart",
  });
};
// 删除数据
export const deleteCartApi = (ids) => {
  return httpInstance({
    url: "/member/cart",
    method: "DELETE",
    data: {
      ids
    },
  });
};
