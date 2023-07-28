/// <reference types="vite/client" />
/// <reference types="@modyfi/vite-plugin-yaml/modules" />

declare module 'vue-qr/src/packages/vue-qr.vue'
declare interface Window {
  ethereum: any
  unisat: any
  config: any
  okxwallet: {
    bitcoin: {
      connect: Function
      selectedAccount: {
        address: string
      }
      signMessage: Function
      send: Function
    }
  }
}
