<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

import { useAppStore } from '@/stores/app'

const route = useRoute()
const router = useRouter()
const onClickNav = (item: any, idx: number) => {
  if (item.disable) return
  currentNavIdx.value = idx
  router.push({
    name: item.routeName,
    query: route.query
  })
}
const onClickRightLink = (item: any) => {
  window.open(item.url)
}
//
const appStore = useAppStore()
const { showDrawer, navList, currentNavIdx, iconList } = storeToRefs(appStore)
const direction = ref('rtl') // right to left
const handleClose = () => {
  showDrawer.value = false
}
</script>
<template>
  <el-drawer
    v-model="showDrawer"
    :with-header="false"
    :direction="direction"
    :before-close="handleClose"
  >
    <ul class="flex flex-col text-black">
      <li
        v-for="(item, idx) in navList"
        :key="item.title"
        @click="onClickNav(item, idx)"
        class="py5"
        :class="{ 'text-[var(--vt-c-main)]': currentNavIdx === idx, disable: item.disable }"
      >
        <span class="font-500" :class="{ 'text-gray': item.disable }">{{ item.title }}</span>
        <img v-if="item.afterIcon" class="ml1" :src="item.afterIcon" />
      </li>
    </ul>
    <!-- icon -->
    <ul class="mt5 flex items-center justify-between">
      <li v-for="item in iconList" :key="item.title" @click="onClickRightLink(item)">
        <div v-if="item.icon" class="icon-container">
          <img :src="item.icon" />
        </div>
        <span v-else class="p10px text-14px text-[#606367] font-500 cursor-pointer hover:op-[.8]">{{
          item.title
        }}</span>
      </li>
    </ul>
  </el-drawer>
</template>
<style scoped lang="less"></style>
