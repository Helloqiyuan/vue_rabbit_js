import httpInstance from "@/utils/http";

export const getOrderApi = () => {
  return httpInstance({
    url: "/member/order/pre",
  });
};
