<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { type WalletInfo, useWalletStore } from '@/stores/wallet'
import { doConnectWallet } from '@/utils/wallet'

const props = defineProps<{
  show: boolean
  title: string
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
const { walletList } = storeToRefs(walletStore)
/* wallet */

const selectWallet = async (item: WalletInfo) => {
  await doConnectWallet(item)
  handleClose()
}

const handleClose = () => {
  emit('update:show', false)
}
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    @close="handleClose"
    title="Connect your wallet"
    class="w-[320px] lg:w-[500px]"
  >
    <ul class="list">
      <li
        v-for="item in walletList"
        :key="item.title"
        @click="selectWallet(item)"
        class="flex items-center justify-between py-4 px-5 h-[88px] text-white cursor-pointer hover:bg-[var(--vt-c-main)]"
      >
        <div>
          <p class="text-[16px] text-[black]">
            {{ item.title }}
          </p>
        </div>
        <img :src="item.icon" class="w-[48px]" />
      </li>
    </ul>
  </el-dialog>
</template>
<style scoped lang="less">
.list {
  > li + li {
    border-top: 1px solid #292929;
  }
  > li:last-child {
    border-radius: 0 0 20px 20px;
  }
}
</style>
