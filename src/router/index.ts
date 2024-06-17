import { createRouter, createWebHistory } from "vue-router";
import { useTokenAndRoleStore } from "@/stores/tokenAndRole";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/loginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/login/registerView.vue"),
    },
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/layout/HomeView.vue"),
    },
    {
      path: "/riders",
      name: "riders",
      component: () => import("@/views/riders/RidersView.vue"),
    },
    {
      path: "/bikes",
      name: "bikes",
      component: () => import("@/views/bikes/BikesView.vue"),
    },
    {
      path: "/user",
      name: "user",
      component: () => import("@/views/usr/UserView.vue"),
    },
    {
      path: "/record",
      name: "record",
      component: () => import("@/views/record/RecordView.vue"),
    },
    {
      path: "/chart",
      name: "chart",
      component: () => import("@/views/chart/ChartView.vue"),
    },
    {
      path: "/map",
      name: "map",
      component: () => import("@/views/map/MapView.vue"),
    },{
      path: "/zone",
      name: "zone",
      component: () => import("@/views/nonparking/ZoneView.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  const store = useTokenAndRoleStore(); // 获取存储状态
  if (to.matched.some((r) => r.meta.requiresAuth)) {
    if (store.tokenAndRole.token && store.tokenAndRole.token !== "") {
      if (to.matched.some((r) => r.meta.requiresUser)) {
        if (store.tokenAndRole.role === "0") {
          next();
        } else {
          next(false);
        }
      }

      if (to.matched.some((r) => r.meta.requiresAdmin)) {
        if (
          store.tokenAndRole.role === "1" ||
          store.tokenAndRole.role === "2"
        ) {
          next();
        } else {
          next(false);
        }
      }

      next();
    } else {
      if (to.matched.some((r) => r.name === "admin")) {
        next({ name: "manage-login", query: { redirect: to.fullPath } });
      }

      next({ name: "login", query: { redirect: to.fullPath } });
    }
  }
  next(); // 如果不要求权限，就按原地址跳转
});
export default router;
