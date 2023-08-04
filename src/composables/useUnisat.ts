import { storeToRefs } from 'pinia'

import { useWalletStore } from '@/stores/wallet'

const useUnisat = () => {
  const store = useWalletStore()
  const { setWalletAddress } = store
  const { networkInfo } = storeToRefs(store)
  const uniObj = window.unisat

  const accountsChangedFun = (accounts: string[]) => {
    setWalletAddress(accounts[0])
    console.log('🚀 ~ file: unisat.ts:9 ~ accountsChangedFun ~ accounts:', accounts)
  }

  const networkChangedFun = (network: string) => {
    console.log('🚀 ~ file: unisat.ts:13 ~ uniObj.on ~ network:', network)
  }

  const addUniListeners = () => {
    if (!uniObj) return
    uniObj.on('accountsChanged', accountsChangedFun)
    uniObj.on('networkChanged', networkChangedFun)
    //
    onBeforeUnmount(() => {
      removeUniListener()
    })
  }

  const removeUniListener = () => {
    if (!uniObj) return
    uniObj.removeListener('accountsChanged', accountsChangedFun)
    uniObj.removeListener('networkChanged', networkChangedFun)
  }

  const switchNetUnisat = async (chainId: string) => {
    if (!uniObj) return
    const map: { [key: string]: string | undefined } = {
      '0': 'livenet',
      t0: 'testnet'
    }
    await uniObj.switchNetwork(map[chainId])
  }

  const connectUnisat = async (chainId?: string) => {
    if (!uniObj) return
    try {
      const id = chainId || networkInfo.value?.chain_id
      if (id === undefined) return
      await switchNetUnisat(id)
      //
      const accounts = await uniObj.requestAccounts()
      console.log('🚀 ~ file: unisat.ts:21 ~ connectUnisat ~ accounts:', accounts)
      setWalletAddress(accounts[0])
    } catch (error) {
      console.log('🚀 ~ file: useUnisat.ts:34 ~ connectUnisat ~ error:', error)
      setWalletAddress('')
    }
  }

  const disconnectUnisat = () => {
    setWalletAddress('')
  }
  return { uniObj, addUniListeners, removeUniListener, connectUnisat, disconnectUnisat }
}
export default useUnisat
