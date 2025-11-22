<template>
  <header class="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-20">
    <div class="flex items-center space-x-3">
      <!-- Burger selalu terlihat -->
      <button @click="$emit('toggle-sidebar')" class="text-gray-500 focus:outline-none mr-3">
        <i class="fas fa-bars text-lg"></i>
      </button>
    </div>

    <div class="flex items-center space-x-4">
      <div class="hidden md:flex items-center text-gray-600 space-x-1">
        <span>Halo,</span>
        <span class="font-medium text-gray-800">{{ user.name }}</span>
      </div>

      <!-- Notifikasi -->
      <button class="text-gray-500 hover:text-primary transition relative">
        <i class="fas fa-bell text-lg"></i>
        <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
      </button>

      <!-- Profil + Logout -->
      <div class="relative">
        <button @click="toggleDropdown" class="flex items-center space-x-2 text-gray-500 hover:text-primary transition">
          <i class="fas fa-user-circle text-2xl"></i>
        </button>

        <div v-if="dropdownOpen" class="absolute right-0 mt-3 w-36 bg-white shadow-lg rounded overflow-hidden z-50">
          <button 
            @click="$emit('logout')" 
            class="flex items-center w-full text-left py-2 px-4 text-gray-700 hover:bg-red-100 hover:text-red-500 transition-colors duration-200"
          >
            <i class="fas fa-sign-out-alt mr-2"></i> Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  data() {
    return {
      dropdownOpen: false
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    }
  }
};
</script>

<style scoped>
/* Tambahan jika perlu */
</style>
