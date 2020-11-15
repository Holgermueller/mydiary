import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/index";
import Dashboard from "../views/Dashboard";
import Previous from "../views/Previous";

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
    },
    {
      path: "/previous",
      name: "Previous",
      component: Previous,
      props: true,
    },
  ],
});

export default router;
