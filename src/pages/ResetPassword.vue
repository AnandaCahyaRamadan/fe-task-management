<template>
  <div class="min-h-screen flex items-center justify-center 
              bg-gradient-to-br from-background to-white/60 
              font-jakarta px-4">

    <div
      class="bg-surface shadow-lg p-8 rounded-2xl w-full max-w-sm border border-gray-100
             transform transition hover:shadow-2xl hover:scale-[1.01]
             animate-fade-slide"
    >

      <!-- Dekor -->
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
            class="w-full px-3 py-2 rounded-lg bg-white 
                   border border-gray-200 text-text text-sm
                   focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary
                   transition placeholder-gray-400"
            placeholder="Masukkan password baru"
          />
        </div>

        <!-- Konfirmasi Password -->
        <div class="animate-fade-slide">
          <label class="block text-sm mb-1 text-text">Konfirmasi Password</label>
          <input
            type="password"
            v-model="password_confirmation"
            class="w-full px-3 py-2 rounded-lg bg-white 
                   border border-gray-200 text-text text-sm
                   focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary
                   transition placeholder-gray-400"
            placeholder="Ulangi password"
          />
        </div>

        <!-- Tombol -->
        <button
          class="w-full bg-primary text-white py-2 rounded-lg 
                 hover:bg-secondary transition font-medium tracking-wide
                 animate-fade-slide"
        >
          Simpan Password Baru
        </button>

        <!-- Balik -->
        <p class="text-center text-sm text-gray-600 mt-2 animate-fade-slide">
          Kembali ke
          <router-link class="text-primary font-medium hover:underline" to="/login">
            Login
          </router-link>
        </p>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      password_confirmation: "",
    };
  },

  methods: {
    resetPassword() {
      console.log("Password Baru:", this.password);
      console.log("Konfirmasi:", this.password_confirmation);
    },
  },
};
</script>
