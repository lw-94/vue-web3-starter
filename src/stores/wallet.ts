import { computed, ref } from 'vue'

import { defineStore } from 'pinia'

import Metamask from '@/assets/img/metamask.png'

export interface WalletInfo {
  title: string
  icon: string
  type: 'metamask'
  objName: string
}

export const useWalletStore = defineStore('wallet', () => {
  const networkId = ref(localStorage.getItem('networkId') || '0x1')
  const walletAddress = ref(localStorage.getItem('walletAddress') || '')
  const walletType = ref(localStorage.getItem('walletType') || 'metamask')
  const walletList = ref<WalletInfo[]>([
    {
      title: 'MetaMask',
      icon: Metamask,
      type: 'metamask',
      objName: 'ethereum'
    }
  ])
  const walletDialogShow = ref(false)
  const accountDialogShow = ref(false)
  //
  const abbAddress = computed(() => {
    if (!walletAddress.value) return ''
    return walletAddress.value.slice(0, 6) + '...' + walletAddress.value.slice(-4)
  })
  const isConnected = computed(() => {
    return !!walletAddress.value
  })
  const walletInfo = computed(() => {
    return walletList.value.find((item) => item.type === walletType.value)
  })
  const networkInfo = computed(() => {
    const networkList = window.config.NETWORK
    return networkList.find((item: any) => item.CHAIN_ID === networkId.value) ?? {}
  })
  function setWalletAddress(val: string) {
    localStorage.setItem('walletAddress', val || '')
    walletAddress.value = val || ''
  }
  function setNetworkId(val: string) {
    localStorage.setItem('networkId', val || '')
    networkId.value = val || ''
  }

  return {
    // state
    networkId,
    walletAddress,
    walletList,
    walletType,
    accountDialogShow,
    walletDialogShow,
    // getter
    abbAddress,
    isConnected,
    walletInfo,
    networkInfo,
    // action
    setWalletAddress,
    setNetworkId
  }
})
