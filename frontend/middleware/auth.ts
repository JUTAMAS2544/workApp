import { useUser } from "~/stores/user.store";

export default defineNuxtRouteMiddleware(to => {
  const user = useUser();

  if (process.server) {
    return
  }
  if (process.client) {
    // const token = localStorage.getItem('token');

    // console.log("Naja 4")

    // if (!to.meta.requiresAuth && to.path !== '/Login' && !user.getUserData) {
    //   // console.log("Naja 6")
    //   return navigateTo('/Login')
    // }
    if (!to.meta.requiresAuth && to.path !== '/Login') {
      // console.log("Naja 6")
      return navigateTo('/Login')
    }
  }


})