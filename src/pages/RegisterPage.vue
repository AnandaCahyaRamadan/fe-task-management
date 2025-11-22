<template>
  <div class="min-h-screen flex items-center justify-center 
              bg-gradient-to-br from-background to-white/60 
              font-jakarta px-4">

    <div
      class="bg-surface shadow-lg p-8 rounded-2xl w-full max-w-sm border border-gray-100
             transform transition hover:shadow-2xl hover:scale-[1.01]
             animate-fade-slide"
    >

      <div class="flex justify-center mb-3">
        <div class="h-2 w-10 bg-primary rounded-full opacity-90"></div>
      </div>

      <h2 class="text-2xl font-bold text-center mb-6 text-primary tracking-wide">
        Daftar
      </h2>

      <form @submit.prevent="register" class="space-y-5">

        <!-- Name -->
        <div>
          <label class="block text-sm mb-1 text-text">Nama Lengkap</label>
          <input
            type="text"
            v-model="name"
            class="w-full px-3 py-2 rounded-lg bg-white border text-sm
                   transition placeholder-gray-400
                   border-gray-200 focus:outline-none
                   focus:ring-2 focus:ring-primary/40 focus:border-primary"
            placeholder="Masukkan nama lengkap"
          />
          <p v-if="errors.name" class="text-red-500 text-xs mt-1">
            {{ errors.name }}
          </p>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm mb-1 text-text">Email</label>
          <input
            type="email"
            v-model="email"
            class="w-full px-3 py-2 rounded-lg bg-white border text-sm
                   transition placeholder-gray-400
                   border-gray-200 focus:outline-none
                   focus:ring-2 focus:ring-primary/40 focus:border-primary"
            placeholder="Masukkan email"
          />
          <p v-if="errors.email" class="text-red-500 text-xs mt-1">
            {{ errors.email }}
          </p>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm mb-1 text-text">Password</label>
          <input
            type="password"
            v-model="password"
            class="w-full px-3 py-2 rounded-lg bg-white border text-sm
                   transition placeholder-gray-400
                   border-gray-200 focus:outline-none
                   focus:ring-2 focus:ring-primary/40 focus:border-primary"
            placeholder="Masukkan password"
          />
          <p v-if="errors.password" class="text-red-500 text-xs mt-1">
            {{ errors.password }}
          </p>
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="block text-sm mb-1 text-text">Konfirmasi Password</label>
          <input
            type="password"
            v-model="confirmPassword"
            class="w-full px-3 py-2 rounded-lg bg-white border text-sm
                   transition placeholder-gray-400
                   border-gray-200 focus:outline-none
                   focus:ring-2 focus:ring-primary/40 focus:border-primary"
            placeholder="Masukkan kembali password"
          />
          <p v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1">
            {{ errors.confirmPassword }}
          </p>
        </div>

        <!-- Tombol -->
        <button
          class="w-full bg-primary text-white py-2 rounded-lg 
                 hover:bg-secondary transition font-medium tracking-wide"
        >
          Daftar
        </button>

        <p class="text-center text-sm text-gray-600 mt-2">
          Sudah punya akun?
          <router-link class="text-primary font-medium hover:underline" to="/login">
            Login
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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role_id: 2,
      user_type_id: 2,
      errors: {},
    };
  },

  methods: {
    async register() {
      this.errors = {};

      if (this.password !== this.confirmPassword) {
        this.errors.confirmPassword = "Konfirmasi password tidak cocok.";
        return;
      }

      try {
        const res = await axios.post("http://localhost:8000/api/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmPassword,
          role_id: this.role_id,
          user_type_id: this.user_type_id,
        });

        localStorage.setItem("token", res.data.token);

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Registrasi berhasil',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          background: '#00A884',
          color: '#fff'          
        });

        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);

      } catch (error) {
        if (error.response?.data?.errors) {
          const err = error.response.data.errors;
          this.errors = {
            name: err.name ? err.name[0] : "",
            email: err.email ? err.email[0] : "",
            password: err.password ? err.password[0] : "",
          };
        } else {
          Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Error',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          text: "Terjadi kesalahan server.",
          color: '#fff'          
        });
        }
      }
    },
  },
};
</script>
