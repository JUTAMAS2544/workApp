import { useUser } from "~/stores/user.store";

export default defineNuxtRouteMiddleware(to => {
  const user = useUser();

  if (process.server) {
    return
  }
  if (process.client) {
    // const token = localStorage.getItem('token');

    console.log("Naja 4")
    // if (!user.getUserData) {
    //   console.log("Naja 5")
    //   return navigateTo('/')
    // }
    if (!to.meta.requiresAuth && to.path !== '/Login') {
      console.log("Naja 6")
      return navigateTo('/Login')
    }
  }


})