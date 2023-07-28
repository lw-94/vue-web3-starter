import { ref } from 'vue'

import { ethers } from 'ethers'
import { storeToRefs } from 'pinia'

import { useWalletStore } from '@/stores/wallet'
import { NFT_ABI } from '@/utils/abis/nft'

import useWallet from './useWallet'

const useApproveV3 = () => {
  const { getWalletProvider, getWalletSigner } = useWallet()
  const walletStore = useWalletStore()
  const { walletAddress } = storeToRefs(walletStore)
  const isApprovingV3 = ref(false)
  const tokenAllowV3 = ref(false)

  const getAllowanceV3 = async (tokenAddr?: string, farmAddr?: string) => {
    if (!tokenAddr || !farmAddr) return '0'
    const provider = getWalletProvider()
    const contract = new ethers.Contract(tokenAddr, NFT_ABI, provider)
    try {
      const allow = await contract.isApprovedForAll(walletAddress.value, farmAddr)
      console.log('🚀 ~ file: useApproveV3.ts:22 ~ getAllowance ~ allow:', allow)
      return allow
    } catch (error) {
      console.log('🚀 ~ file: useApproveV3.ts:45 ~ getAllowance ~ error:', error)
      return false
    }
  }
  const onApproveV3 = async (tokenAddr?: string, farmAddr?: string) => {
    if (!tokenAddr || !farmAddr) return
    if (isApprovingV3.value) return
    const signer = getWalletSigner()
    const contract = new ethers.Contract(tokenAddr, NFT_ABI, signer)
    isApprovingV3.value = true
    try {
      const res = await contract.setApprovalForAll(farmAddr, true)
      await res.wait(1)
      ElMessage({
        message: 'Success',
        type: 'success'
      })
      tokenAllowV3.value = await getAllowanceV3(tokenAddr, farmAddr)
    } catch (error) {
      console.log('🚀 ~ file: useApproveV3.ts:61 ~ onApprove ~ error:', error)
    }
    isApprovingV3.value = false
  }
  return { isApprovingV3, tokenAllowV3, getAllowanceV3, onApproveV3 }
}

export default useApproveV3
