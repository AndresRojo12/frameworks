export const useMainStore = defineStore('main-store', {
    state: () => {
      return {
        drawerApp: true,
        great: "hi"
      }
    },
    actions: {
      greatUnic(value) {
          return this.great + value
      }
    },
  })