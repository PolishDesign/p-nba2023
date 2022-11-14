import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    isLoading: false,
    isShowOverlay: false,
    browserName: null,
  }),
  actions: {
    showLoading() {
      this.isLoading = true
    },
    hideLoading() {
      this.isLoading = false
    },
    showOverlay() {
      this.isShowOverlay = true
    },
    hideOverlay() {
      this.isShowOverlay = false
    },
    updateBrowserName(name) {
      this.browserName = name
    },
  }
})
