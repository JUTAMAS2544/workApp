import axios from 'axios';
import { defineStore } from 'pinia'
import type { ChangePasswordType, LoginType, RegisterType, UserType, ResponseType } from '~/types/user';

export const useUser = defineStore('user', () => {
  const authToken = ref('')
  const userData = ref<UserType | null>()
  const register = ref<RegisterType>()
  const checkChangePassword = ref<ResponseType>()

  const getAuthToken = computed(() => authToken.value)
  const getUserData = computed(() => userData.value)
  const getRegister = computed(() => register.value)
  const getCheckChangePassword = computed(() => checkChangePassword.value)

  async function fetchLogin(payload: LoginType) {
    try {
      const { data } = await axios.post<ResponseType>(`${import.meta.env.VITE_API}/login/`, payload)

      if (data.status === 'ok') {
        authToken.value = data.message
        localStorage.setItem("token", data.message)
      } else {
        alert(data.message)
      }

    } catch (err) {
      // alert("Login Failed, Please check the correctness of your email and password.")
      console.log("error", err)
    }
  }

  async function changePassword(payload: ChangePasswordType) {
    try {
      const { data } = await axios.put<ResponseType>(`${import.meta.env.VITE_API}/changePassword/`, payload)
      checkChangePassword.value = data
      if (data.status === 'error') {
        alert(data.message)
      }
    } catch (err) {
      // alert("Unable to change password Please check the correctness of your email.")
      console.log("error", err)
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
      const { data } = await axios.post<ResponseType>(`${import.meta.env.VITE_API}/register/`, payload)

      console.log("register: ", data)

    } catch (err) {
      alert("Register Failed.")
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
    getCheckChangePassword,
    fetchLogin,
    fetchAuth,
    logout,
    changePassword,
    fetchRegister,
  }
});