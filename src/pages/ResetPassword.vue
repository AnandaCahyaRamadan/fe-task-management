<template>
  <div class="min-h-screen flex items-center justify-center 
              bg-gradient-to-br from-background to-white/60 font-jakarta px-4">
    <div class="bg-surface shadow-lg p-8 rounded-2xl w-full max-w-sm border border-gray-100
                transform transition hover:shadow-2xl hover:scale-[1.01] animate-fade-slide">

      <div class="flex justify-center mb-3">
        <div class="h-2 w-10 bg-primary rounded-full opacity-90"></div>
      </div>

      <h2 class="text-2xl font-bold text-center mb-6 text-primary tracking-wide">
        Reset Password
      </h2>

      <form @submit.prevent="resetPassword" class="space-y-5">

        <!-- Password Baru -->
        <div class="animate-fade-slide">
          <label class="block text-sm mb-1 text-text">Password Baru</label>
          <input
            type="password"
            v-model="password"
            :disabled="loading"
            class="w-full px-3 py-2 rounded-lg bg-white border text-text text-sm
                   focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            placeholder="Masukkan password baru"
          />
          <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
        </div>

        <!-- Konfirmasi Password -->
        <div class="animate-fade-slide">
          <label class="block text-sm mb-1 text-text">Konfirmasi Password</label>
          <input
            type="password"
            v-model="password_confirmation"
            :disabled="loading"
            class="w-full px-3 py-2 rounded-lg bg-white border text-text text-sm
                   focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            placeholder="Ulangi password"
          />
          <p v-if="errors.password_confirmation" class="text-red-500 text-xs mt-1">
            {{ errors.password_confirmation }}
          </p>
        </div>

        <!-- Tombol -->
        <button
          class="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition font-medium tracking-wide animate-fade-slide flex justify-center items-center"
          :disabled="loading"
        >
          <span v-if="!loading">Simpan Password Baru</span>
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
  props: ["token", "email"],
  data() {
    return {
      password: "",
      password_confirmation: "",
      errors: {},
      loading: false
    };
  },

  methods: {
    async resetPassword() {
      this.errors = {};
      this.loading = true; // mulai loading
      try {
        const res = await axios.post("/reset-password", {
          token: this.token,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        });

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          text: res.data.message || "Password berhasil direset",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true
        });

        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);

      } catch (error) {
        if (error.response?.data?.errors) {
          const err = error.response.data.errors;
          this.errors = {
            password: err.password ? err.password[0] : "",
            password_confirmation: err.password_confirmation ? err.password_confirmation[0] : ""
          };
        } else {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            text: error.response?.data?.message || "Terjadi kesalahan server",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true
          });
        }
      } finally {
        this.loading = false; // selesai loading
      }
    }
  }
};
</script>
