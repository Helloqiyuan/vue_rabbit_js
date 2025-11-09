import httpInstance from "@/utils/http";
/**
 * @description: 获取轮播图数据
 * @param {*} id 广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
 * @return {*}
 */
export const getAllSwiperApi = (distributionSite = 1) =>{
  return httpInstance({
    url:'/home/banner',
    params:{
      distributionSite
    }
  })
}

export const getNewsApi = () =>{
  return httpInstance({
    url:'/home/new'
  })
}

export const getHotApi =()=>{
  return httpInstance({
    url:'/home/hot'
  })
}
export const getGoodsApi = ()=>{
  return httpInstance({
    url:'/home/goods'
  })
}
