<script setup>
import LayoutNav from './components/LayoutNav.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutFooter from './components/LayoutFooter.vue';
import LayoutFixed from './components/LayoutFixed.vue';
import { useCategoryStore } from '@/stores/category';
import { onMounted } from 'vue';
useCategoryStore().getCategoryData()
onMounted(() => {
})
</script>
<template>
  <LayoutNav />
  <LayoutFixed />
  <LayoutHeader />
  <!-- 强制销毁重建组件（Key 策略） 需要精细化请求时(节省资源)不推荐 -->
  <!-- <RouterView :key="$route.fullPath"/> -->
  <RouterView />
  <LayoutFooter />
</template>
