import { createRouter, createWebHashHistory } from "vue-router";
import PortfolioView from "../views/PortfolioView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/portfolio",
      name: "portfolio",
      component: PortfolioView,
      meta: {
        pos: 0,
      },
    },
    {
      path: "/cv",
      name: "cv",
      component: () => import("../views/CVView.vue"),
      meta: {
        pos: 1,
      },
    },
    {
      path: "/contacts",
      name: "contacts",
      component: () => import("../views/ContactView.vue"),
      meta: {
        pos: 2,
      },
    },
  ],
});
export default router;
