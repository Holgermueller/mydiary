import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase";
import Home from "../views/index";
import Dashboard from "../views/Dashboard";
import Previous from "../views/Previous";
import SingleEntryPage from "../views/SingleEntry";
import Settings from "../views/Settings";
import DeleteAcct from "../views/DeleteAcct";

Vue.use(VueRouter);

let router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", name: "Home", component: Home },

    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/previous",
      name: "Previous",
      component: Previous,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/SingleEntryPage/:entryId",
      name: "SingleEntryPage",
      component: SingleEntryPage,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/Settings",
      name: "Settings",
      component: Settings,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/DeleteAcct",
      name: "DeleteAcct",
      component: DeleteAcct,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: "/",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
