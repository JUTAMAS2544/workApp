export const useActive = defineStore('menu', () => {
  const path = ref(0)
  const getPath = computed(() => path.value)
  const setPath = (value: number) => {
    path.value = value
  }
  return {
    getPath,
    setPath,
  }
});