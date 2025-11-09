<script setup>
import { watch, ref, onMounted } from 'vue'
import { getCategoryApi } from '@/apis/category';
// 使用pinia缓存的数据
// import { useCategoryStore } from '@/stores/category';
import { getAllSwiperApi } from '@/apis/home';
const categoryData = ref({})
const swiperData = ref([])
const props = defineProps(['id'])

const getCategoryData = async (id) => {
  const res = await getCategoryApi(id)
  categoryData.value = res.result
  // categoryData.value = useCategoryStore().globalCategoryData.filter(e => e.id === id)[0]
  console.log("@", categoryData.value);
}
const getSwiperData = async () => {
  // 广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
  const res = await getAllSwiperApi(2)
  swiperData.value = res.result
}
watch(() => props.id, (newValue) => {
  getCategoryData(newValue)
  getSwiperData()
})
onMounted(() => {
  getCategoryData(props.id)
  getSwiperData()
})
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
  </div>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in swiperData" :key="item.id">
        <img :src="item.imgUrl" alt="轮播图图片">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>


<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}

.home-banner {
  width: 1240px;
  height: 500px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
