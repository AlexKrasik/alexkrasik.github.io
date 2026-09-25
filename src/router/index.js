import {createRouter, createWebHashHistory} from "vue-router";
import PortfolioView from "../views/PortfolioView.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import CustomLayout from "@/layouts/CustomLayout.vue";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: MainLayout,
            children: [
                {
                    path: "",
                    alias: "/projects",
                    name: "projects",
                    component: PortfolioView,

                },
                {
                    path: "cv",
                    name: "cv",
                    component: () => import("../views/CVView.vue"),

                },
                {
                    path: "contacts",
                    name: "contacts",
                    component: () => import("../views/ContactView.vue"),

                },
                {
                    path: "kompjs",
                    name: 'kompJS',
                    component: () => import("../views/KompPlaygroundView.vue"),
                }
            ],
        },
    ],
});
export default router;
