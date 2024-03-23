export const useActive = defineStore('menu', () => {
  const path = ref(0)
  const showChangePage = ref(false)
  const checkPage = ref(false)
  const keepPage = ref('')

  const getPath = computed(() => path.value)
  const getShowChangePage = computed(() => showChangePage.value)
  const getCheckPage = computed(() => checkPage.value)
  const getKeepPage = computed(() => keepPage.value)

  const setPath = (value: number) => {
    path.value = value
  }
  const setShowChangePage = (value: boolean) => {
    showChangePage.value = value
  }
  const setCheckPage = (value: boolean) => {
    checkPage.value = value
  }
  const setKeepPage = (value: string) => {
    keepPage.value = value
  }

  return {
    getPath,
    getShowChangePage,
    getCheckPage,
    getKeepPage,
    setPath,
    setShowChangePage,
    setCheckPage,
    setKeepPage,
  }
});