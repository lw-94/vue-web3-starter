<script setup lang="ts">
//
withDefaults(
  defineProps<{
    counting?: boolean
    countTime: number
  }>(),
  {
    counting: true
  }
)
const emit = defineEmits<{
  (e: 'end'): void
}>()

const onCountdownEnd = () => {
  emit('end')
}
</script>
<template>
  <vue-countdown
    v-if="counting"
    :time="countTime"
    @end="onCountdownEnd"
    v-slot="{ days, hours, minutes, seconds }"
  >
    <ul class="flex items-center select-none">
      <li class="square">
        <span>{{ days }}<i>d</i></span>
      </li>
      <li class="colon">:</li>
      <li class="square">
        <span>{{ hours }}<i>h</i></span>
      </li>
      <li class="colon">:</li>
      <li class="square">
        <span>{{ minutes }}<i>m</i></span>
      </li>
      <li class="colon">:</li>
      <li class="square">
        <span>{{ seconds }}<i>s</i></span>
      </li>
    </ul>
  </vue-countdown>
</template>
<style scoped lang="less">
//
.square {
  --at-apply: w20 h74px flex items-center justify-center bg-[#FAD29E] rounded-[6px]
    text-[var(--vt-c-main)] text-[26px];
  i {
    --at-apply: text-5 text-black;
  }
}
.colon {
  --at-apply: w9 text-center text-9 font-500;
}
</style>
