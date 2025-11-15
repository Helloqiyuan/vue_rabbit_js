import httpInstance from "@/utils/http";

export const getAddressApi = () => {
  return httpInstance({
    url: "/member/address",
  });
};
