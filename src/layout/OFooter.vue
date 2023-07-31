<script setup lang="ts">
//
const linkArr = ref([
  {
    title: '©',
    children: []
  },
  {
    title: 'title1',
    children: []
  },
  {
    title: 'title2',
    children: []
  },
  {
    title: 'title3',
    children: []
  }
])

const onClickLink = (link: string) => {
  window.open(link)
}
</script>
<template>
  <div class="flex flex-col items-center bg-[var(--vt-c-main-light)] py-10">
    <div class="lg:w-[1120px] text-black">
      <ul class="px5 lg:px0 flex flex-wrap justify-between">
        <li v-for="item in linkArr" :key="item.title" class="w165px lg:w[240px]">
          <dl>
            <dt class="py4 font-500 border-b border-solid border-[#000]">
              {{ item.title }}
            </dt>
            <template v-for="itemChild in item.children">
              <dd
                v-if="itemChild"
                :key="itemChild.title"
                class="flex items-center py2 border-b border-solid border-[#6f6f6f] cursor-pointer hover:op-[.8]"
                @click="onClickLink(itemChild.link)"
              >
                <img :src="itemChild.icon" class="w4 h4 mr-[10px]" />
                <span class="font-300">{{ itemChild.title }}</span>
              </dd>
            </template>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="less">
/**/
</style>
