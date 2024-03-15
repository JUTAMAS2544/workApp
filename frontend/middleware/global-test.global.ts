import { useActive } from "~/stores/active.store";
import { useUser } from "~/stores/user.store";

export default defineNuxtRouteMiddleware(to => {
  const user = useUser();
  const menu = useActive();

  if (process.server) {
    return
      // this section will run on the server
  }

  if (process.client) {
    const token = localStorage.getItem('token');

    if (to.path === "/") {
      menu.setPath(0);
      console.log(to.path)
    } else if (to.path === "/Login") {
      menu.setPath(11);
    } else if (to.path === "/Assessment/Page-1") {
      menu.setPath(1);
      console.log(to.path)
    }

    if (token && user.getUserData) {
      console.log(to)
      // console.log(token)
      to.meta.requiresAuth = true;
    } else {
      to.meta.requiresAuth = false;
      localStorage.removeItem('token');
    }
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