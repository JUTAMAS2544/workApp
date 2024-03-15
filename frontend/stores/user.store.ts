import axios from 'axios';
import { defineStore } from 'pinia'
import type { LoginType, UserType } from '~/types/user';

export const useUser = defineStore('user', () => {
  const authToken = ref('')
  const userData = ref<UserType | null>()

  const getAuthToken = computed(() => authToken.value)
  const getUserData = computed(() => userData.value)

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

  async function fetchAuth() {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${import.meta.env.VITE_API}/user/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }})

      userData.value = data
      console.log("User data: ", data)

    } catch (err) {
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
    fetchLogin,
    fetchAuth,
    logout,
  }
});