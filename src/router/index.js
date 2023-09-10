import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CityView from "../views/CityView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home | Weather Us",
      },
    },
    {
      path: "/weather/:state/:city",
      name: "city",
      component: CityView,
      meta: {
        title: "City Weather | Weather Us",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.params.city ? `${to.params.city} Local Weather | Weather Us` : to.meta.title;
  next();
});

export default router;
