import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import ForgotPassword from "../pages/ForgotPassword.vue";
import ResetPassword from "../pages/ResetPassword.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import DashboardPage from "../pages/DashboardPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";

const routes = [
  { path: "/", redirect: "/login" },

  { path: "/login", name: "Login", component: LoginPage },
  { path: "/register", name: "Register", component: RegisterPage },

  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
  },

  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
    props: route => ({ token: route.query.token, email: route.query.email }),
  },

  {
    path: "/dashboard",
    component: DashboardLayout, // layout utama
    children: [
      { path: "", name: "DashboardPage", component: DashboardPage },
      { path: "/profile", name: "ProfilePage", component: ProfilePage },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
