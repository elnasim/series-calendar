import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AddContentView from "@/views/AddContentView.vue";
import AdminSerialsView from "@/views/admin/serials/AdminSerialsView.vue";
import AdminSerialView from "@/views/admin/serials/id/AdminSerialView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/admin",
    name: "admin",
    redirect: "/",
  },
  {
    path: "/admin/add",
    name: "add-content",
    component: AddContentView,
  },
  {
    path: "/admin/serials",
    name: "admin-serials",
    component: AdminSerialsView,
  },
  {
    path: "/admin/serials/:id",
    name: "show",
    component: AdminSerialView,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
