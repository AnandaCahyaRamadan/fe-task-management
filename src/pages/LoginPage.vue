<template>
  <div class="min-h-screen flex items-center justify-center 
              bg-gradient-to-br from-background to-white/60 
              font-jakarta px-4">

    <div
      class="bg-surface shadow-lg p-8 rounded-2xl w-full max-w-sm border border-gray-100
             transform transition hover:shadow-2xl hover:scale-[1.01]
             animate-fade-slide"
    >

      <!-- Dekorasi kecil -->
      <div class="flex justify-center mb-3">
        <div class="h-2 w-10 bg-primary rounded-full opacity-90"></div>
      </div>

      <!-- Judul -->
      <h2 class="text-2xl font-bold text-center mb-6 text-primary tracking-wide">
        Masuk
      </h2>

      <form @submit.prevent="login" class="space-y-5">

        <!-- Email -->
        <div class="animate-fade-slide">
          <label class="block text-sm mb-1 text-text">Email</label>
          <input
            type="email"
            v-model="email"
            :disabled="loading"
            class="w-full px-3 py-2 rounded-lg bg-white 
                   border border-gray-200 text-text text-sm
                   focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary
                   transition placeholder-gray-400"
            placeholder="Masukkan email"
          />
          <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
        </div>

        <!-- Password -->
        <div class="animate-fade-slide">
          <label class="block text-sm mb-1 text-text">Password</label>
          <input
            type="password"
            v-model="password"
            :disabled="loading"
            class="w-full px-3 py-2 rounded-lg bg-white 
                   border border-gray-200 text-text text-sm
                   focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary
                   transition placeholder-gray-400"
            placeholder="Masukkan password"
          />
          <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
        </div>

        <div class="animate-fade-slide">
          <router-link 
            to="/forgot-password" 
            class="block text-right text-sm text-primary font-medium hover:underline transition"
          >
            Lupa password?
          </router-link>
        </div>

        <!-- Tombol Login -->
        <button
          type="submit"
          class="w-full bg-primary text-white py-2 rounded-lg 
                 hover:bg-secondary transition font-medium tracking-wide flex justify-center items-center"
          :disabled="loading"
        >
          <span v-if="!loading">Login</span>
          <span v-else class="flex items-center gap-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            Loading...
          </span>
        </button>

        <p class="text-center text-sm text-gray-600 mt-2 animate-fade-slide">
          Belum punya akun?
          <router-link class="text-primary font-medium hover:underline" to="/register">
            Daftar
          </router-link>
        </p>

      </form>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import Swal from "sweetalert2";

  export default {
    data() {
      return {
        email: "",
        password: "",
        errors: {},
        loading: false
      };
    },

    methods: {
      async login() {
        this.errors = {};
        this.loading = true;

        try {
          const res = await axios.post("/login", {
            email: this.email,
            password: this.password
          });

          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: res.data.message || "Login berhasil",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true
          });

          setTimeout(() => {
            this.$router.push("/dashboard");
          }, 1000);

        } catch (error) {
          if (error.response?.status === 401) {
            this.errors.password = error.response.data.message;
          } else if (error.response?.data?.errors) {
            const err = error.response.data.errors;
            this.errors = {
              email: err.email ? err.email[0] : "",
              password: err.password ? err.password[0] : "",
            };
          } else {
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: "error",
              title: "Terjadi kesalahan server",
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true
            });
          }
        } finally {
          this.loading = false;
        }
      }
    }
  };
</script>
