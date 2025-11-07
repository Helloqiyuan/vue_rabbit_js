import httpInstance from "@/utils/http";

export const getAllCategoryApi = () =>{
  return httpInstance({
    url:"/home/category/head"
  })
}
