export const useValidate = defineStore('validate', () => {
  const isRequired = (value: string) => {
    if (!value) return 'ต้องกรอก'
    return ''
  }
  const isEmail = (value: string) => {
    if (!/^[a-zA-Z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return 'โปรดตรวจสอบความถูกต้องของอีเมล'
    return ''
  }
  const isPassword = (value: string) => {
    if (value.length < 8) return 'ต้องมีอย่างน้อย 8 ตัวอักษร'
    return ''
  }
  return {
    isRequired,
    isEmail,
    isPassword,
  }
});