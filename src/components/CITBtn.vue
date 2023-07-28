<script setup lang="ts">
import type { NetInfo, TokenInfo } from '@/apis/bridge'

//

defineProps<{
  info: TokenInfo | NetInfo | undefined
}>()
</script>
<template>
  <div>
    <div
      class="hidden lg:flex items-center justify-center h-[28px] lg:h-[35px] px-2 rounded-[10px] bg-[#1c1c1c] select-none bd-[#292929]"
    >
      <img v-if="info?.img_url" :src="info?.img_url" class="w-6 h-6" />
      <span class="ml-2">{{ info?.name }}</span>
    </div>
    <img v-if="info?.img_url" :src="info?.img_url" class="flex lg:hidden w-6 h-6" />
  </div>
</template>
<style scoped lang="less">
/**/
</style>
