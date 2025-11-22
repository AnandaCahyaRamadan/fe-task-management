import { createRouter, createWebHistory } from "vue-router";

// Pages
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import ForgotPassword from "../pages/ForgotPassword.vue";
import ResetPassword from "../pages/ResetPassword.vue";

const routes = [
  { path: "/", redirect: "/login" },

  { path: "/login", name: "Login", component: LoginPage },
  { path: "/register", name: "Register", component: RegisterPage },

  // Forgot Password
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
  },

  // Reset Password (biasanya pakai token)
  {
    path: "/reset-password/:token",
    name: "ResetPassword",
    component: ResetPassword,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
