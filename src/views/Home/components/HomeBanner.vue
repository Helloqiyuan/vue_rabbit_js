<script setup>
import {onMounted, ref} from 'vue'
import { getAllSwiperApi } from '@/apis/home';
const swiperData = ref([])
const getSwiperData = async ()=>{
  const res = await getAllSwiperApi()
  swiperData.value = res.result
  console.log(res);
}
onMounted(()=>{
  getSwiperData()
})
</script>



<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in swiperData" :key="item.id">
        <img :src="item.imgUrl" alt="轮播图图片">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
