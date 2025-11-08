import httpInstance from "@/utils/http";

export const getAllSwiperApi = () =>{
  return httpInstance({
    url:'/home/banner'
  })
}

export const getNewsApi = () =>{
  return httpInstance({
    url:'/home/new'
  })
}

export const getHotApi =()=>{
  return httpInstance({
    url:'/home/brand'
  })
}
