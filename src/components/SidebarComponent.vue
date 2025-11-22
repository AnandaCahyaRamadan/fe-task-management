<template>
  <!-- Mobile Overlay -->
  <div v-if="!isDesktop && mobileSidebarOpen" class="fixed inset-0 z-40">
    <!-- Overlay gelap -->
    <div 
        class="fixed inset-0 transition-opacity duration-300"
        @click="closeMobileSidebar"
        style="background-color: rgba(0, 0, 0, 0.5);"
      >
    </div>

    <!-- Sidebar mobile -->
    <aside
      class="fixed top-0 left-0 h-full w-64 bg-white shadow-md flex flex-col transform transition-transform duration-300 z-50"
      :class="mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex items-center justify-between p-4 border-b">
        <!-- <h1 class="font-bold text-xl text-primary">Task Manajemen</h1> -->
         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Logo.min.svg/2560px-Logo.min.svg.png" alt="" style="width: 120px !important;">
        <button @click="closeMobileSidebar" class="text-gray-500 focus:outline-none">
          <i class="fas fa-times text-lg"></i>
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto mt-2 px-2">
        <ul>
          <li class="mb-2">
            <router-link
              to="/dashboard"
              class="flex items-center py-2 px-4 rounded-lg transition-colors duration-200"
              :class="isActive('/dashboard') ? 'bg-primary text-white shadow' : 'text-gray-700 hover:bg-primary/20 hover:text-primary'"
            >
              <i class="fas fa-home mr-3"></i>
              <span class="font-medium">Dashboard</span>
            </router-link>
          </li>
          <li class="mb-2">
            <router-link
              to="/dashboard/profile"
              class="flex items-center py-2 px-4 rounded-lg transition-colors duration-200"
              :class="isActive('/dashboard/profile') ? 'bg-primary text-white shadow' : 'text-gray-700 hover:bg-primary/20 hover:text-primary'"
            >
              <i class="fas fa-user mr-3"></i>
              <span class="font-medium">Profile</span>
            </router-link>
          </li>
          <li class="mt-auto">
            <button
              @click="$emit('logout')"
              class="flex items-center w-full text-left py-2 px-4 rounded-lg text-gray-700 hover:bg-red-100 hover:text-red-500 transition-colors duration-200"
            >
              <i class="fas fa-sign-out-alt mr-3"></i>
              <span class="font-medium">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  </div>

  <!-- Desktop Sidebar -->
  <aside 
    v-if="isDesktop" 
    class="bg-white shadow-md flex-shrink-0 h-screen flex flex-col transition-all duration-300 ease-in-out overflow-hidden"
    :class="sidebarOpen ? 'w-64' : 'w-0'"
  >
    <div class="pl-4 pr-4 pt-4 pb-4 flex items-center">
      <div v-if="sidebarOpen">
        <!-- <h1 class="font-bold text-xl text-primary">Task Manajemen</h1> -->
         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Logo.min.svg/2560px-Logo.min.svg.png" alt="" style="width: 120px !important;">
      </div>
    </div>

    <nav class="mt-2 flex-1 overflow-y-auto px-2">
      <ul>
        <li class="mb-2">
          <router-link
            to="/dashboard"
            class="flex items-center py-2 px-4 rounded-lg transition-colors duration-200"
            :class="isActive('/dashboard') ? 'bg-primary text-white shadow' : 'text-gray-700 hover:bg-primary/20 hover:text-primary'"
          >
            <i class="fas fa-home mr-3"></i>
            <span v-if="sidebarOpen" class="font-medium">Dashboard</span>
          </router-link>
        </li>
        <li class="mb-2">
          <router-link
            to="/dashboard/profile"
            class="flex items-center py-2 px-4 rounded-lg transition-colors duration-200"
            :class="isActive('/dashboard/profile') ? 'bg-primary text-white shadow' : 'text-gray-700 hover:bg-primary/20 hover:text-primary'"
          >
            <i class="fas fa-user mr-3"></i>
            <span v-if="sidebarOpen" class="font-medium">Profile</span>
          </router-link>
        </li>
        <li class="mt-auto">
          <button 
            @click="$emit('logout')" 
            class="flex items-center w-full text-left py-2 px-4 rounded-lg text-gray-700 hover:bg-red-100 hover:text-red-500 transition-colors duration-200"
          >
            <i class="fas fa-sign-out-alt mr-3"></i>
            <span v-if="sidebarOpen" class="font-medium">Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "SidebarComponent",
  props: { modelValue: { type: Boolean, default: true } },
  data() {
    return {
      isDesktop: window.innerWidth >= 768,
      mobileSidebarOpen: false
    };
  },
  computed: {
    sidebarOpen: {
      get() { return this.modelValue; },
      set(val) { this.$emit("update:modelValue", val); }
    }
  },
  mounted() { window.addEventListener("resize", this.onResize); },
  beforeUnmount() { window.removeEventListener("resize", this.onResize); },
  methods: {
    isActive(path) { return this.$route.path === path; },
    onResize() { this.isDesktop = window.innerWidth >= 768; if(this.isDesktop) this.sidebarOpen = true; },
    openMobileSidebar() { this.mobileSidebarOpen = true; },
    closeMobileSidebar() { this.mobileSidebarOpen = false; }
  }
};
</script>

<style scoped>
  aside::-webkit-scrollbar {
    width: 6px;
  }
  aside::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.15);
    border-radius: 3px;
  }
</style>
