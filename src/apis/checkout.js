import httpInstance from "@/utils/http";

// 获取预订单信息
export const getCheckOutApi = () => {
  return httpInstance({
    url: "/member/order/pre",
  });
};

// 创建订单
export const createOrderApi = (data) => {
  return httpInstance({
    url: "/member/order",
    method: "POST",
    data,
  });
};

// 获取订单信息
export const getOrderApi = (id) => {
  return httpInstance({
    url: "/member/order",
    query: {
      id,
    },
  });
};
