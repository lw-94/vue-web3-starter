<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { RouterView } from 'vue-router'

import Nav from '@/layout/ONav.vue'
import Slider from '@/layout/OSlider.vue'

import OFooter from './OFooter.vue'

// use v-if control pc or h5 components need to use, fix useIntervalFn run twice
const { width } = useWindowSize()
const isH5 = computed(() => {
  return width.value < 1024
})
</script>
<template>
  <div class="flex flex-col">
    <Nav />
    <RouterView />
    <OFooter />
    <Slider v-if="isH5" />
  </div>
</template>

<style lang="less" scoped></style>
