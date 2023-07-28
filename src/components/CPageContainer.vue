<script setup lang="ts">
withDefaults(
  defineProps<{
    bg?: boolean
  }>(),
  {
    bg: false
  }
)
</script>
<template>
  <div class="mt52px lg:mt64px text-black" :class="{ 'cover-bg': bg }">
    <slot />
  </div>
</template>
<style scoped lang="less">
/**/
.cover-bg {
  overflow: hidden;
  background: url('@/assets/img/bg.png') #ffeceb 50% / cover;
}
</style>
