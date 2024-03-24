import { useActive } from "~/stores/active.store";
import { useUser } from "~/stores/user.store";

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUser();
  const menu = useActive();

  if (process.server) {
    return
      // this section will run on the server
  }

  if (process.client) {
    if (menu.getCheckPage && to.path !== '/Assessment/Page-1'){
      if (to.path === '/Assessment/Summary') {
        menu.setCheckPage(false);
        menu.setShowChangePage(false);
      } else {
        menu.setShowChangePage(true);
        menu.setKeepPage(to.path)
        return abortNavigation();
      }
    }

    if (to.path === "/Login") {
      menu.setPath(11);
    }else if (to.path === "/Assessment/PageStart" || to.path === "/Assessment/Page-1" || to.path === "/Assessment/Summary" || to.path === "/Assessment/Suggession") {
      menu.setPath(1);
      user.fetchAuth()
    } else if (to.path === "/Pricing") {
      menu.setPath(2);
    } else if (to.path === "/Contact") {
      menu.setPath(3);
    } else {
      user.fetchAuth()
      menu.setPath(0);
    }

    const token = localStorage.getItem('token');
    if (token) {
      // console.log("Naja 1")
      to.meta.requiresAuth = true;
      if (!user.getUserData) {
        to.meta.requiresAuth = false;
        // console.log("Naja 2")
      }
    } else {
      to.meta.requiresAuth = false;
      localStorage.removeItem('token');
      // console.log("Naja 3")
    }


    // console.log("Naja", to.meta.requiresAuth)

     //this section will run in the browser so you can access
     // local storage
  }


  // const nuxtApp = useNuxtApp()
  // if (process.client && nuxtApp.isHydrating &&
  //             nuxtApp.payload.serverRendered) {
  //    // this section will run only once , in the browser, when the page
  //    // initialized
  // }
})