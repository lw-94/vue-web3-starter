import { ethers } from 'ethers'
import { storeToRefs } from 'pinia'

import useWallet from '@/composables/useWallet'
import { type WalletInfo, useWalletStore } from '@/stores/wallet'

import { ERC20_ABI } from './abis/erc20'

export const doConnectWallet = async (item: WalletInfo) => {
  console.log('🚀 ~ file: wallet.ts:8 ~ doConnectWal ~ item:', item)
  if (!item) return
  const { connectWallet } = useWallet()
  try {
    await connectWallet()
  } catch (error) {
    console.log('🚀 ~ file: wallet.ts:14 ~ doConnectWal ~ error:', error)
  }
}

export const getETHBalance = async () => {
  let balance = '0'
  const { getWalletSigner } = useWallet()
  try {
    const signer = getWalletSigner() as ethers.providers.JsonRpcSigner
    const wei = await signer.getBalance()
    balance = ethers.utils.formatUnits(wei, 18)
  } catch (error) {
    console.log('🚀 ~ file: wallet.ts:26 ~ getETHBalance ~ error:', error)
  }
  return balance
}

export const getTokenBalance = async (tokenAddr: string) => {
  let balance = '0'
  const { getWalletProvider } = useWallet()
  const walletStore = useWalletStore()
  const { walletAddress } = storeToRefs(walletStore)
  try {
    const p = getWalletProvider() as ethers.providers.Web3Provider
    const contract = new ethers.Contract(tokenAddr, ERC20_ABI, p)
    const [wei, decimal] = await Promise.all([
      contract.balanceOf(walletAddress.value),
      contract.decimals()
    ])
    balance = ethers.utils.formatUnits(wei, decimal)
  } catch (error) {
    console.log('🚀 ~ file: wallet.ts:45 ~ getTokenBalance ~ error:', error)
  }
  return balance
}

export const checkNet = (chainId: string, sendMsg: boolean = true) => {
  const { IS_DEV } = window.config
  if (!IS_DEV && chainId !== '0x1') {
    // production only Ethereum Mainnet
    if (sendMsg) {
      //@ts-ignore
      ElMessage({
        message: 'Please switch to the Ethereum Mainnet network',
        type: 'warning'
      })
    }
    return false
  }
  return true
}
