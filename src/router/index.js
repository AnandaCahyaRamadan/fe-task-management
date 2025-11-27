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
import UserPage from "../pages/UserPage.vue";
import TaskPage from "../pages/TaskPage.vue";
import TaskDetailPage from "@/pages/TaskDetailPage.vue";
import LandingPage from "@/pages/LandingPage.vue";

const routes = [
  { path: "/", name: "Landing Page", component: LandingPage },

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
      { path: "profile", name: "ProfilePage", component: ProfilePage },
      { path: "member", name: "MemberPage", component: MemberPage },
      { path: "role", name: "RolePage", component: RolePage },
      { path: "user", name: "UserPage", component: UserPage },
      { path: "task", name: "TaskPage", component: TaskPage },
      {
        path: "tasks/:id/detail",
        name: "TaskDetailPage",
        component: TaskDetailPage,
        props: true,
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
