<template>
  <!-- Mobile Overlay -->
  <div v-if="!isDesktop && mobileSidebarOpen" class="fixed inset-0 z-40">
    <div 
        class="fixed inset-0 transition-opacity duration-300"
        @click="closeMobileSidebar"
        style="background-color: rgba(0, 0, 0, 0.5);"
    ></div>

    <aside
      class="fixed top-0 left-0 h-full w-64 bg-white shadow-md flex flex-col transform transition-transform duration-300 z-50"
      :class="mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="relative p-4 border-b flex justify-center items-center">
        <img :src="require('@/assets/logo.png')" alt="Logo" class="w-[170px] mx-auto">

        <button 
          @click="closeMobileSidebar" 
          class="absolute right-4 text-gray-500 focus:outline-none"
        >
          <i class="fas fa-times text-lg"></i>
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto mt-2 px-2">
        <ul>
          <!-- General Menu -->
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
              to="/dashboard/task"
              class="flex items-center py-2 px-4 rounded-lg transition-colors duration-200"
              :class="isActive('/dashboard/task') ? 'bg-primary text-white shadow' : 'text-gray-700 hover:bg-primary/20 hover:text-primary'"
            >
              <i class="fas fa-tasks mr-3"></i>
              <span class="font-medium">Task</span>
            </router-link>
          </li>
          <li class="mb-2">
            <router-link
              to="/dashboard/member"
              class="flex items-center py-2 px-4 rounded-lg transition-colors duration-200"
              :class="isActive('/dashboard/member') ? 'bg-primary text-white shadow' : 'text-gray-700 hover:bg-primary/20 hover:text-primary'"
            >
              <i class="fas fa-users mr-3"></i>
              <span class="font-medium">Member</span>
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

          <!-- Admin Menu -->
          <li class="mt-4 mb-2 text-gray-400 uppercase text-xs px-4">Admin</li>
          <li class="mb-2">
            <router-link
              to="/dashboard/role"
              class="flex items-center py-2 px-4 rounded-lg transition-colors duration-200"
              :class="isActive('/dashboard/role') ? 'bg-primary text-white shadow' : 'text-gray-700 hover:bg-primary/20 hover:text-primary'"
            >
              <i class="fas fa-user-shield mr-3"></i>
              <span class="font-medium">Role</span>
            </router-link>
          </li>
          <li class="mb-2">
            <router-link
              to="/dashboard/user"
              class="flex items-center py-2 px-4 rounded-lg transition-colors duration-200"
              :class="isActive('/dashboard/user') ? 'bg-primary text-white shadow' : 'text-gray-700 hover:bg-primary/20 hover:text-primary'"
            >
              <i class="fas fa-user-cog mr-3"></i>
              <span class="font-medium">User</span>
            </router-link>
          </li>

          <!-- Logout -->
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
        <div class="relative p-4 border-b flex justify-center items-center">
            <img :src="require('@/assets/logo.png')" alt="Logo" class="w-[170px] mx-auto">
        </div>
      </div>
    </div>

    <nav class="mt-2 flex-1 overflow-y-auto px-2">
      <ul>
        <!-- General Menu -->
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
            to="/dashboard/task"
            class="flex items-center py-2 px-4 rounded-lg transition-colors duration-200"
            :class="isActive('/dashboard/task') ? 'bg-primary text-white shadow' : 'text-gray-700 hover:bg-primary/20 hover:text-primary'"
          >
            <i class="fas fa-tasks mr-3"></i>
            <span v-if="sidebarOpen" class="font-medium">Task</span>
          </router-link>
        </li>
        <li class="mb-2">
          <router-link
            to="/dashboard/member"
            class="flex items-center py-2 px-4 rounded-lg transition-colors duration-200"
            :class="isActive('/dashboard/member') ? 'bg-primary text-white shadow' : 'text-gray-700 hover:bg-primary/20 hover:text-primary'"
          >
            <i class="fas fa-users mr-3"></i>
            <span v-if="sidebarOpen" class="font-medium">Member</span>
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

        <!-- Admin Menu -->
        <li class="mt-4 mb-2 text-gray-400 uppercase text-xs px-4" v-if="sidebarOpen">Admin</li>
        <li class="mb-2">
          <router-link
            to="/dashboard/role"
            class="flex items-center py-2 px-4 rounded-lg transition-colors duration-200"
            :class="isActive('/dashboard/role') ? 'bg-primary text-white shadow' : 'text-gray-700 hover:bg-primary/20 hover:text-primary'"
          >
            <i class="fas fa-user-shield mr-3"></i>
            <span v-if="sidebarOpen" class="font-medium">Role</span>
          </router-link>
        </li>
        <li class="mb-2">
          <router-link
            to="/dashboard/user"
            class="flex items-center py-2 px-4 rounded-lg transition-colors duration-200"
            :class="isActive('/dashboard/user') ? 'bg-primary text-white shadow' : 'text-gray-700 hover:bg-primary/20 hover:text-primary'"
          >
            <i class="fas fa-user-cog mr-3"></i>
            <span v-if="sidebarOpen" class="font-medium">User</span>
          </router-link>
        </li>

        <!-- Logout -->
        <li class="mt-auto mb-10">
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
