<template>
  <header class="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-20">
    <div class="flex items-center space-x-3">
      <!-- Burger selalu terlihat -->
      <button @click="$emit('toggle-sidebar')" class="text-gray-500 focus:outline-none mr-3">
        <i class="fas fa-bars text-lg"></i>
      </button>
      <!-- <h2 class="text-xl font-semibold text-gray-700">{{ title }}</h2> -->
    </div>

    <div class="flex items-center space-x-4">
      <div class="hidden md:flex items-center text-gray-600 space-x-1">
        <span>Halo,</span>
        <span class="font-medium text-gray-800">{{ user.name }}</span>
      </div>
      <button class="text-gray-500 hover:text-primary transition relative">
        <i class="fas fa-bell text-lg"></i>
        <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
      </button>
      <button class="flex items-center space-x-2 text-gray-500 hover:text-primary transition">
        <i class="fas fa-user-circle text-2xl"></i>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    user: Object,
    title: { type: String, default: "Dashboard" },
  }
};
</script>
