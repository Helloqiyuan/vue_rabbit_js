import httpInstance from "@/utils/http";

export const getAllSwiperApi = () =>{
  return httpInstance({
    url:'/home/banner'
  })
}
