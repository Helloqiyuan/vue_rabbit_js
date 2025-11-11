<script setup>
import { ref, onMounted } from 'vue'
import { getHotGoodsAPI } from '@/apis/detail'
const hotGoodsData = ref([])
const props = defineProps(['id','type'])
const getHotGoodsData = async () => {
  const res = await getHotGoodsAPI({
    id: props.id,
    type: props.type,
  })
  hotGoodsData.value = res.result
  console.log("hotGoodsData:",hotGoodsData.value);
}
onMounted(()=>{
  getHotGoodsData()
})
</script>


<template>
  <div class="goods-hot">
    <h3 v-if="props.type === 1">24小时热销榜</h3>
    <h3 v-else>周热销榜</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in hotGoodsData" :key="item.id">
      <img v-img-lazy="item.picture" alt="" />
      <p class="name ellipsis">{{item.name  }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>


<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>
