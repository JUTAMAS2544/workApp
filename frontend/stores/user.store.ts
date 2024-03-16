import axios from 'axios';
import { defineStore } from 'pinia'
import type { ChangePasswordType, LoginType, RegisterType, UserType } from '~/types/user';

export const useUser = defineStore('user', () => {
  const authToken = ref('')
  const userData = ref<UserType | null>()
  const register = ref<RegisterType>()

  const getAuthToken = computed(() => authToken.value)
  const getUserData = computed(() => userData.value)
  const getRegister = computed(() => register.value)

  async function fetchLogin(payload: LoginType) {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}/login/`, payload)

      authToken.value = data.token
      localStorage.setItem("token", authToken.value)

    } catch (err) {
      alert("Login Failed, Please check the correctness of your email and password.")
      // console.log(err)
    }
  }

  async function changePassword(payload: ChangePasswordType) {
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API}/changePassword/`, payload)
    } catch (err) {
      alert("Unable to change password Please check the correctness of your email.")
    }
  }

  async function fetchAuth() {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${import.meta.env.VITE_API}/user/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }})

      userData.value = data

    } catch (err) {
      console.log(err)
    }
  }

  async function fetchRegister(payload: RegisterType) {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}/register/`, payload)

    } catch (err) {
      alert("Register Failed.")
      console.log(err)
    }
  }


  function logout() {
    localStorage.removeItem("token")
    authToken.value = ""
    userData.value = null
  }

  return {
    getAuthToken,
    getUserData,
    getRegister,
    fetchLogin,
    fetchAuth,
    logout,
    changePassword,
    fetchRegister,
  }
});