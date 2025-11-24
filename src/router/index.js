import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import ForgotPassword from "../pages/ForgotPassword.vue";
import ResetPassword from "../pages/ResetPassword.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import DashboardPage from "../pages/DashboardPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import MemberPage from "../pages/MemberPage.vue";
import RolePage from "../pages/RolePage.vue";

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
      { path: "profile", name: "ProfilePage", component: ProfilePage }, // hapus slash
      { path: "member", name: "MemberPage", component: MemberPage }, // hapus slash
      { path: "role", name: "RolePage", component: RolePage }, // hapus slash
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
