<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

import Logo from '@/assets/svg/logo.svg'
import Search from '@/assets/svg/search.svg'
import useWallet from '@/composables/useWallet'
import { useAppStore } from '@/stores/app'
import { useWalletStore } from '@/stores/wallet'
import { strTo16 } from '@/utils/index'

const store = useWalletStore()
const { setNetworkId } = store
const { isConnected, abbAddress, walletDialogShow, accountDialogShow } = storeToRefs(store)

const { addWalletListener, removeWalletListener } = useWallet()
//
const openWalletDialog = () => {
  walletDialogShow.value = true
}
const openAccountDialog = () => {
  accountDialogShow.value = true
}

//
const onClickConnectBtn = async () => {
  isConnected.value ? openAccountDialog() : openWalletDialog()
}

const appStore = useAppStore()
const { showDrawer, navList, currentNavIdx, iconList } = storeToRefs(appStore)
const toggleMenu = () => {
  showDrawer.value = !showDrawer.value
}
//
const route = useRoute()
const router = useRouter()
const goHome = () => {
  location.href = 'https://dune.com/home'
}
//
const searchText = ref('')
const isSearchFocus = ref(false)
const onInputEnter = () => {
  window.open(`https://dune.com/browse/dashboards?q=${searchText.value}`)
}

const onClickNav = (item: any, idx: number) => {
  if (item.disable) return
  currentNavIdx.value = idx
  router.push({
    name: item.routeName,
    query: route.query
  })
}

const onClickRightLink = (item: any) => {
  window.open(item.url)
}
const initNavIdx = () => {
  const reg = /\/([a-zA-Z\d]+)\/?/
  const idx = navList.value.findIndex((item) => {
    const r = route.path.match(reg) ?? ''
    return item.routeName === r[1]
  })
  if (idx == -1) {
    currentNavIdx.value = 0
  } else {
    currentNavIdx.value = idx
  }
}
const { getWalletProvider } = useWallet()
const initNet = async () => {
  const p = getWalletProvider()
  const network = await p?.getNetwork()
  const chainId = strTo16(network?.chainId as number)
  setNetworkId(chainId)
}
onMounted(() => {
  addWalletListener()
  initNavIdx()
  initNet()
})
</script>
<template>
  <div class="nav-fixed bg-white px2 lg:px5">
    <div class="nav-container h52px lg:h64px box-border">
      <section class="nav-left">
        <img :src="Logo" class="w-[24px] cursor-pointer" @click="goHome" />
        <el-input
          v-model="searchText"
          class="hidden lg:flex w-[140px] m-2 shadow-[#bfbfbf]! transition-all"
          :class="[isSearchFocus ? 'w206px' : 'w140px']"
          placeholder="Search..."
          @keyup.enter="onInputEnter"
          @focus="isSearchFocus = true"
          @blur="isSearchFocus = false"
        >
          <template #prefix>
            <img :src="Search" />
          </template>
        </el-input>
        <ul class="nav hidden lg:flex">
          <li
            v-for="(item, idx) in navList"
            :key="item.title"
            @click="onClickNav(item, idx)"
            :class="{ active: currentNavIdx === idx, disable: item.disable }"
          >
            <span class="font-500" :class="{ 'text-gray': item.disable }">{{ item.title }}</span>
            <img v-if="item.afterIcon" class="ml1" :src="item.afterIcon" />
          </li>
        </ul>
      </section>
      <section class="nav-right">
        <ul class="hidden lg:flex items-center mr-2">
          <li v-for="item in iconList" :key="item.title" @click="onClickRightLink(item)">
            <div v-if="item.icon" class="icon-container">
              <img :src="item.icon" />
            </div>
            <span
              v-else
              class="p10px text-14px text-[#606367] font-500 cursor-pointer hover:op-[.8]"
              >{{ item.title }}</span
            >
          </li>
        </ul>
        <CBtn
          :title="isConnected ? abbAddress : 'Connect Wallet'"
          @click="onClickConnectBtn"
          class="text-14px h32px! font-500"
        />
        <i class="flex lg:hidden ml2 p2 bg-[#efefef] rounded-2" @click="toggleMenu"
          ><el-icon color="black"><Menu /></el-icon
        ></i>
      </section>
    </div>
  </div>
  <WalletDialog v-model:show="walletDialogShow" />
  <AccountDialog v-model:show="accountDialogShow" />
</template>
<style scoped lang="less">
/**/

.nav-fixed {
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  border-bottom: 1px solid #e6e6e6;
  transition: all 0.3s;
}
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .nav-left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      width: 276px;
      margin-right: 44px;
    }
  }
  .nav {
    align-items: center;
    & > li {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #606367;
      padding: 25px 8px;
      cursor: pointer;
      border-bottom: 1px solid transparent;
      transition: all 0.3s;
      &.disable {
        cursor: not-allowed;
      }
      &.active {
        color: var(--vt-c-main);
        border-bottom: 1px solid var(--vt-c-main);
      }
    }
  }
}
.nav-right {
  display: flex;
  align-items: center;
  .icon-container {
    margin: 0 2px;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background: #e9ebee;
    }
  }
}

.nav-fixed-h5 {
  padding: 0 16px;
  width: 100vw;
  box-sizing: border-box;
  .nav-h5 {
    height: 60px;
  }
  .nav-left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      width: 20px;
      margin-right: 10px;
    }
  }
  .icon-list {
    display: flex;
    margin-right: 20px;
    .icon {
      margin: 0 10px;
      cursor: pointer;
      opacity: 1;
      transition: opacity 0.3s;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #bfbfbf inset;
  padding: 1px 10px;
  .el-input__inner {
    font-size: 13px;
    font-family: monospace;
    &::placeholder {
      color: #757575;
    }
  }
  .el-input__prefix-inner > :last-child {
    margin-right: 5px;
  }
}
</style>
