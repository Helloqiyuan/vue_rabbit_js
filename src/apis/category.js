import httpInstance from "@/utils/http";

export const getCategoryApi = (id) =>{
  return httpInstance({
    url:'/category',
    params:{
      id
    }
  })
}
