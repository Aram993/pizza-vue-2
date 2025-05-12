import { createRouter, createWebHistory} from "vue-router";
import MainPage from "./pages/MainPage.vue";
import Cart from "./pages/Cart.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/main", component: MainPage, alias: "/"},
        {path: "/cart", component: Cart}
    ],
    linkActiveClass: "active"
})

export default router;