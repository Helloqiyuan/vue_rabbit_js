<script setup>
import { onMounted, ref } from 'vue'
import HomeContent from './HomeContent.vue';
import { getHotApi } from '@/apis/home';
const hotData = ref([])
const getHotData = async () => {
  const res = await getHotApi()
  hotData.value = res.result
  console.log(hotData.value);
}
onMounted(() => {
  getHotData()
})
</script>
<template>
  <HomeContent>
    <template #title>人气推荐</template>
    <template #sub-title>人气爆款 不容错过</template>
    <template #main>
      <ul class="goods-list">
        <li v-for="item in hotData" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>
      </ul>
    </template>
  </HomeContent>
</template>

<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
