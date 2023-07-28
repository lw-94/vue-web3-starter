<script setup lang="ts">
import { ref, watch } from 'vue'

import { storeToRefs } from 'pinia'

import { useWalletStore } from '@/stores/wallet'

const props = defineProps<{
  show: boolean
}>()
const emit = defineEmits(['update:show', 'callback'])
const dialogVisible = ref(false)
watch(
  () => props.show,
  (newVal) => {
    dialogVisible.value = newVal
  },
  {
    immediate: true
  }
)
/*  */
const walletStore = useWalletStore()
const { setWalletAddress } = walletStore
const { walletInfo, abbAddress, walletAddress, walletDialogShow } = storeToRefs(walletStore)

const onDisconnect = () => {
  setWalletAddress('')
  handleClose()
  walletDialogShow.value = true
}
// const onView = () => {
//   const explorer = networkInfo.value.explorer_url
//   window.open(`${explorer}/${isBitNet.value ? 'address/' : ''}${walletAddress.value}`)
// }
const onCopy = () => {
  navigator.clipboard.writeText(walletAddress.value)
  //@ts-ignore
  ElMessage({
    message: 'Copied',
    type: 'success'
  })
}

const handleClose = () => {
  emit('update:show', false)
}
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    @close="handleClose"
    title="Account"
    class="w-[320px] lg:w-[500px]"
  >
    <div class="p5 text-white text-4">
      <p class="flex items-center justify-between">
        <img :src="walletInfo?.icon" class="w[48px] h[48px]" />
        <span
          class="text-[var(--vt-c-main)] cursor-pointer hover:op-[.8] select-none"
          @click="onDisconnect"
          >Disconnect</span
        >
      </p>
      <p class="mt5 p5 rounded-3 bg-white text-black">{{ abbAddress }}</p>
      <div class="mt5 flex items-center justify-between">
        <!-- <CBtn title="View on explorer" @click="onView" /> -->
        <span></span>
        <div class="flex items-center cursor-pointer hover:op-[.8]" @click="onCopy">
          <el-icon color="var(--vt-c-main)"><DocumentCopy /></el-icon>
          <span class="ml1 text-[var(--vt-c-main)]">Copy Address</span>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<style scoped lang="less"></style>
