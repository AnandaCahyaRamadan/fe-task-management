<template>
  <div class="min-h-screen flex items-center justify-center 
              bg-gradient-to-br from-background to-white/60 font-jakarta px-4">
    <div class="bg-surface shadow-lg p-8 rounded-2xl w-full max-w-sm border border-gray-100
                transform transition hover:shadow-2xl hover:scale-[1.01] animate-fade-slide">

      <div class="flex justify-center mb-3">
        <div class="h-2 w-10 bg-primary rounded-full opacity-90"></div>
      </div>

      <h2 class="text-2xl font-bold text-center mb-6 text-primary tracking-wide">
        Lupa Password
      </h2>

      <p class="text-center text-gray-600 text-sm mb-6 animate-fade-slide">
        Masukkan email yang terdaftar. Kami akan mengirimkan link reset password.
      </p>

      <form @submit.prevent="submitEmail" class="space-y-5">

        <!-- Email -->
        <div class="animate-fade-slide">
          <label class="block text-sm mb-1 text-text">Email</label>
          <input
            type="email"
            v-model="email"
            class="w-full px-3 py-2 rounded-lg bg-white border text-text text-sm
                   focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            placeholder="Masukkan email"
            :disabled="loading"
          />
          <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
        </div>

        <!-- Tombol -->
        <button
          class="w-full bg-primary text-white py-2 rounded-lg 
                 hover:bg-secondary transition font-medium tracking-wide animate-fade-slide flex justify-center items-center"
          :disabled="loading"
        >
          <span v-if="!loading">Kirim Link Reset</span>
          <span v-else class="flex items-center gap-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            Loading...
          </span>
        </button>

        <p class="text-center text-sm text-gray-600 mt-2 animate-fade-slide">
          Kembali ke
          <router-link class="text-primary font-medium hover:underline" to="/login">Login</router-link>
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
      errors: {},
      loading: false, // state loading
    };
  },

  methods: {
    async submitEmail() {
      this.errors = {};
      this.loading = true; // mulai loading
      try {
        const res = await axios.post("/forgot-password", {
          email: this.email
        });

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: res.data.message || "Link reset dikirim ke email.",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true
        });

      } catch (error) {
        if (error.response?.data?.errors) {
          const err = error.response.data.errors;
          this.errors = {
            email: err.email ? err.email[0] : ""
          };
        } else {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: error.response?.data?.message || "Terjadi kesalahan server",
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
