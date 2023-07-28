import { ref } from 'vue'

import { ethers } from 'ethers'
import { storeToRefs } from 'pinia'

import { useWalletStore } from '@/stores/wallet'
import { ERC20_ABI } from '@/utils/abis/erc20'
import { MAX_NUM } from '@/utils/constants'

import useWallet from './useWallet'

const useApprove = () => {
  const { getWalletProvider, getWalletSigner } = useWallet()
  const walletStore = useWalletStore()
  const { walletAddress } = storeToRefs(walletStore)
  const isApproving = ref(false)
  const tokenAllow = ref('0')
  const getAllowance = async (tokenAddr?: string, farmAddr?: string) => {
    if (!tokenAddr || !farmAddr) return '0'
    const provider = getWalletProvider()
    const contract = new ethers.Contract(tokenAddr, ERC20_ABI, provider)
    try {
      const [bn, decimal] = await Promise.all([
        contract.allowance(walletAddress.value, farmAddr),
        contract.decimals()
      ])
      const allow = ethers.utils.formatUnits(bn, decimal)
      console.log('🚀 ~ file: useApprove.ts:42 ~ getAllowance ~ allow:', allow)
      return Promise.resolve(allow)
    } catch (error) {
      console.log('🚀 ~ file: useApprove.ts:45 ~ getAllowance ~ error:', error)
      return '0'
    }
  }
  const onApprove = async (tokenAddr?: string, farmAddr?: string) => {
    if (!tokenAddr || !farmAddr) return
    if (isApproving.value) return
    const signer = getWalletSigner()
    const contract = new ethers.Contract(tokenAddr, ERC20_ABI, signer)
    isApproving.value = true
    try {
      const res = await contract.approve(farmAddr, MAX_NUM)
      await res.wait(1)
      ElMessage({
        message: 'Success',
        type: 'success'
      })
      tokenAllow.value = await getAllowance(tokenAddr, farmAddr)
    } catch (error) {
      console.log('🚀 ~ file: useApprove.ts:61 ~ onApprove ~ error:', error)
    }
    isApproving.value = false
  }
  return { isApproving, tokenAllow, getAllowance, onApprove }
}

export default useApprove
