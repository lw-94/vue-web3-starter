import { defineStore } from 'pinia'

import Telegram from '@/assets/svg/telegram.svg'
import Twitter from '@/assets/svg/twitter.svg'

interface NavInfo {
  title: string
  routeName: string
  disable?: boolean
  afterIcon?: string
}
export const useAppStore = defineStore('app', () => {
  const navList = ref<NavInfo[]>([
    {
      title: 'Airdrop',
      routeName: 'airdrop'
    },
    {
      title: 'Invite',
      routeName: 'invite'
      // afterIcon: User
    },
    {
      title: 'IDO',
      routeName: 'ido'
    },
    {
      title: 'Farm',
      routeName: 'farm'
    },
    {
      title: 'Luckydrop',
      routeName: 'luckydrop',
      disable: true
    },
    {
      title: 'Anydata',
      routeName: 'anydata',
      disable: true
    }
  ])
  const currentNavIdx = ref(0)

  const iconList = ref([
    {
      title: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/DuneAirdrop'
    },
    {
      title: 'Telegram',
      icon: Telegram,
      url: 'https://t.me/DUNEDAO'
    }
  ])
  const showDrawer = ref(false)
  return {
    navList,
    currentNavIdx,
    iconList,
    showDrawer
  }
})
