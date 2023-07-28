import { onBeforeUnmount } from 'vue'

import { ethers } from 'ethers'
import { storeToRefs } from 'pinia'

import { useWalletStore } from '@/stores/wallet'

import type { NetInfo } from '@/apis/bridge'

const strTo16 = (numStr: string): string => {
  return '0x' + parseInt(numStr).toString(16)
}
const formatAddChain = (info: NetInfo) => {
  const {
    chain_id,
    currency_decimals,
    currency_name,
    currency_symbol,
    explorer_url,
    img_url,
    name,
    rpc_url
  } = info

  return {
    chainName: name,
    chainId: strTo16(chain_id),
    nativeCurrency: {
      name: currency_name,
      symbol: currency_symbol,
      decimals: currency_decimals
    },
    rpcUrls: [rpc_url],
    blockExplorerUrls: [explorer_url],
    iconUrls: [img_url]
  }
}

const useWallet = () => {
  const store = useWalletStore()
  const { setWalletAddress } = store
  const { networkInfo, walletInfo } = storeToRefs(store)
  const walletObj = window.ethereum
  const okxBitObj = window.okxwallet?.bitcoin

  const addWalletListener = (obj: any = walletObj) => {
    obj.on('accountsChanged', (account: string[]) => {
      console.log('🚀 ~ file: useWallet.ts:18 ~ obj.on ~ account:', account)
      setWalletAddress(account[0])
    })
    obj.on('chainChanged', (chainId: string) => {
      console.log('🚀 ~ file: useWallet.ts:19 ~ obj.on ~ chainId:', chainId)
    })
    obj.on('disconnect', (err: any) => {
      console.log('🚀 ~ file: useWallet.ts:22 ~ obj.on ~ err:', err)
    })
    //
    onBeforeUnmount(() => {
      obj.removeAllListeners()
    })
  }

  const removeWalletListener = (obj: any = walletObj) => {
    obj.removeAllListeners()
  }

  const getWalletProvider = (obj?: any) => {
    const key = walletInfo.value?.objName as keyof typeof window
    if (!obj) obj = window[key]
    try {
      return new ethers.providers.Web3Provider(obj)
    } catch (error) {
      console.log('🚀 ~ file: useWallet.ts:69 ~ getWalletProvider ~ error:', error)
    }
  }

  const getWalletSigner = () => {
    const p = getWalletProvider()
    return p?.getSigner()
  }

  const getRpcProvider = () => {
    const rpcUrl = networkInfo.value?.rpc_url
    return new ethers.providers.JsonRpcProvider(rpcUrl)
  }

  const connectWallet = async (netInfo?: NetInfo, wObj: any = walletObj) => {
    const provider = getWalletProvider(wObj)
    if (!provider) return
    const info = netInfo || networkInfo.value
    if (info === undefined) return
    try {
      const chainId = strTo16(info.chain_id)
      console.log('🚀 ~ file: useWallet.ts:47 ~ switchNetWal ~ chainId:', chainId)
      await provider.send('wallet_switchEthereumChain', [{ chainId }])
      const accounts = await provider.send('eth_requestAccounts', [])
      console.log('🚀 ~ file: useWallet.ts:37 ~ connectWal ~ accounts:', accounts)
      setWalletAddress(accounts[0])
    } catch (error: any) {
      switch (error.code) {
        case 4902:
          try {
            await provider.send('wallet_addEthereumChain', [formatAddChain(info)])
            const accounts = await provider.send('eth_requestAccounts', [])
            console.log('🚀 ~ file: useWallet.ts:72 ~ connectWal ~ accounts:', accounts)
            setWalletAddress(accounts[0])
          } catch (error: any) {
            console.log('🚀 ~ file: useWallet.ts:82 ~ connectWal ~ error:', error)
            setWalletAddress('')
          }
          break
        default:
          break
      }
    }
  }

  const connectOkxBitcoin = async () => {
    try {
      // const result = await okxBitObj.connect()
      await okxBitObj.connect()
      const address = okxBitObj.selectedAccount.address
      // setWalletAddress(result.address)
      setWalletAddress(address)
    } catch (error) {
      console.log('🚀 ~ file: useWallet.ts:105 ~ connectOkxBitcoin ~ error:', error)
      setWalletAddress('')
    }
  }

  const disconnectWallet = () => {
    setWalletAddress('')
  }

  return {
    addWalletListener,
    removeWalletListener,
    getWalletProvider,
    getRpcProvider,
    getWalletSigner,
    connectWallet,
    connectOkxBitcoin,
    disconnectWallet
  }
}
export default useWallet
