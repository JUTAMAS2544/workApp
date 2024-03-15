export default defineNuxtRouteMiddleware(to => {

  // if (to.path === '/Login' && to.meta.requiresAuth) {
  //   return navigateTo('/')
  // }

  if (!to.meta.requiresAuth && to.path !== '/Login') {
    return navigateTo('/Login')
  }

})