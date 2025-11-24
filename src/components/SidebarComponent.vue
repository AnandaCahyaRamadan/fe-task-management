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
      <!-- Logo -->
      <div class="relative p-4 border-b flex justify-center items-center bg-primary">
        <img src="https://i0.wp.com/rumahcoding.co.id/wp-content/uploads/2020/10/Vue-JS-logo-3-2.png?fit=750%2C749&ssl=1" 
             alt="Logo" 
             class="w-[130px] mx-auto logo">
        <button 
          @click="closeMobileSidebar" 
          class="absolute right-4 text-gray-500 focus:outline-none"
        >
          <i class="fas fa-times text-lg"></i>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto mt-2 px-2">
        <ul>
          <!-- General Menu -->
          <li class="mb-2">
            <router-link
              to="/dashboard"
              class="menu-item flex items-center py-2 px-4 rounded-lg"
              :class="isActive('/dashboard') ? 'bg-blue-500 text-white shadow' : 'text-gray-700 hover:bg-blue-400 hover:text-white'"
            >
              <i class="fas fa-home mr-3"></i>
              <span class="font-medium">Dashboard</span>
            </router-link>
          </li>

          <li class="mb-2">
            <router-link
              to="/dashboard/task"
              class="menu-item flex items-center py-2 px-4 rounded-lg"
              :class="isActive('/dashboard/task*') ? 'bg-yellow-400 text-white shadow' : 'text-gray-700 hover:bg-yellow-300 hover:text-white'"
            >
              <i class="fas fa-tasks mr-3"></i>
              <span class="font-medium">Task</span>
              <span v-if="tasks.pending && tasks.pending.length > 0" 
                    class="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {{ tasks.pending.length }}
              </span>
            </router-link>
          </li>

          <li class="mb-2" v-if="userLogged.user_type_id == 1">
            <router-link
              to="/dashboard/member"
              class="menu-item flex items-center py-2 px-4 rounded-lg"
              :class="isActive('/dashboard/member') ? 'bg-purple-500 text-white shadow' : 'text-gray-700 hover:bg-purple-400 hover:text-white'"
            >
              <i class="fas fa-users mr-3"></i>
              <span class="font-medium">Member</span>
            </router-link>
          </li>

          <li class="mb-2">
            <router-link
              to="/dashboard/profile"
              class="menu-item flex items-center py-2 px-4 rounded-lg"
              :class="isActive('/dashboard/profile') ? 'bg-green-500 text-white shadow' : 'text-gray-700 hover:bg-green-400 hover:text-white'"
            >
              <i class="fas fa-user mr-3"></i>
              <span class="font-medium">Profile</span>
            </router-link>
          </li>

          <!-- Admin Menu -->
          <template v-if="userLogged && userLogged.role && userLogged.role.name === 'Admin'">
            <li class="mt-4 mb-2 border-t border-gray-200 text-gray-500 uppercase text-xs px-4" v-if="sidebarOpen">Admin</li>
            <li class="mb-2">
              <router-link
                to="/dashboard/role"
                class="menu-item flex items-center py-2 px-4 rounded-lg"
                :class="isActive('/dashboard/role') ? 'bg-indigo-500 text-white shadow' : 'text-gray-700 hover:bg-indigo-400 hover:text-white'"
              >
                <i class="fas fa-user-shield mr-3"></i>
                <span class="font-medium">Role</span>
              </router-link>
            </li>
            <li class="mb-2">
              <router-link
                to="/dashboard/user"
                class="menu-item flex items-center py-2 px-4 rounded-lg"
                :class="isActive('/dashboard/user') ? 'bg-pink-500 text-white shadow' : 'text-gray-700 hover:bg-pink-400 hover:text-white'"
              >
                <i class="fas fa-user-cog mr-3"></i>
                <span class="font-medium">User</span>
              </router-link>
            </li>
          </template>
        </ul>
      </nav>
    </aside>
  </div>

  <!-- Desktop Sidebar -->
  <aside 
    v-if="isDesktop" 
    class="bg-white shadow-md flex-shrink-0 h-screen flex flex-col transition-all duration-400 ease-in-out overflow-hidden"
    :class="sidebarOpen ? 'w-64' : 'w-0'"
  >
    <div class="pl-4 pr-4 pt-4 pb-4 flex items-center bg-primary">
      <div v-if="sidebarOpen">
        <div class="relative p-4 border-b flex justify-center items-center">
            <img src="https://i0.wp.com/rumahcoding.co.id/wp-content/uploads/2020/10/Vue-JS-logo-3-2.png?fit=750%2C749&ssl=1" 
                 alt="Logo" 
                 class="w-[130px] mx-auto logo">
        </div>
      </div>
    </div>

    <nav class="mt-2 flex-1 overflow-y-auto px-2">
      <ul>
        <!-- General Menu -->
        <li class="mb-2 mt-3">
          <router-link
            to="/dashboard"
            class="menu-item flex items-center py-2 px-4 rounded-lg"
            :class="isActive('/dashboard') ? 'bg-blue-500 text-white shadow' : 'text-gray-700 hover:bg-blue-400 hover:text-white'"
          >
            <i class="fas fa-home mr-3"></i>
            <span v-if="sidebarOpen" class="font-medium">Dashboard</span>
          </router-link>
        </li>

        <li class="mb-2">
          <router-link
            to="/dashboard/task"
            class="menu-item flex items-center py-2 px-4 rounded-lg"
            :class="isActive('/dashboard/task*') ? 'bg-yellow-400 text-white shadow' : 'text-gray-700 hover:bg-yellow-300 hover:text-white'"
          >
            <i class="fas fa-tasks mr-3"></i>
            <span v-if="sidebarOpen" class="font-medium">Task</span>
            <span v-if="tasks.pending && tasks.pending.length > 0" 
                  class="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {{ tasks.pending.length }}
            </span>
          </router-link>
        </li>

        <li class="mb-2" v-if="userLogged.user_type_id == 1">
          <router-link
            to="/dashboard/member"
            class="menu-item flex items-center py-2 px-4 rounded-lg"
            :class="isActive('/dashboard/member') ? 'bg-purple-500 text-white shadow' : 'text-gray-700 hover:bg-purple-400 hover:text-white'"
          >
            <i class="fas fa-users mr-3"></i>
            <span v-if="sidebarOpen" class="font-medium">Member</span>
          </router-link>
        </li>

        <li class="mb-2">
          <router-link
            to="/dashboard/profile"
            class="menu-item flex items-center py-2 px-4 rounded-lg"
            :class="isActive('/dashboard/profile') ? 'bg-green-500 text-white shadow' : 'text-gray-700 hover:bg-green-400 hover:text-white'"
          >
            <i class="fas fa-user mr-3"></i>
            <span v-if="sidebarOpen" class="font-medium">Profile</span>
          </router-link>
        </li>

        <!-- Admin Menu -->
        <template v-if="userLogged && userLogged.role && userLogged.role.name === 'Admin'">
          <li class="mt-4 mb-2 border-t border-gray-200 text-gray-500 uppercase text-xs px-4" v-if="sidebarOpen">Admin</li>
          <li class="mb-2">
            <router-link
              to="/dashboard/role"
              class="menu-item flex items-center py-2 px-4 rounded-lg"
              :class="isActive('/dashboard/role') ? 'bg-indigo-500 text-white shadow' : 'text-gray-700 hover:bg-indigo-400 hover:text-white'"
            >
              <i class="fas fa-user-shield mr-3"></i>
              <span v-if="sidebarOpen" class="font-medium">Role</span>
            </router-link>
          </li>
          <li class="mb-2">
            <router-link
              to="/dashboard/user"
              class="menu-item flex items-center py-2 px-4 rounded-lg"
              :class="isActive('/dashboard/user') ? 'bg-pink-500 text-white shadow' : 'text-gray-700 hover:bg-pink-400 hover:text-white'"
            >
              <i class="fas fa-user-cog mr-3"></i>
              <span v-if="sidebarOpen" class="font-medium">User</span>
            </router-link>
          </li>
        </template>
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
      mobileSidebarOpen: false,
      userLogged: {},
      tasks: { pending: [] }
    };
  },
  computed: {
    sidebarOpen: {
      get() { return this.modelValue; },
      set(val) { this.$emit("update:modelValue", val); }
    }
  },
  mounted() { 
    window.addEventListener("resize", this.onResize);
    const user = localStorage.getItem("user");
    if (user) this.userLogged = JSON.parse(user);

    const tasks = localStorage.getItem("tasks");
    if (tasks) this.tasks = JSON.parse(tasks);
  },
  beforeUnmount() { window.removeEventListener("resize", this.onResize); },
  methods: {
    isActive(path) {
      if (path.endsWith("*")) {
        const prefix = path.slice(0, -1);
        return this.$route.path.startsWith(prefix);
      }
      return this.$route.path === path;
    },
    onResize() { 
      this.isDesktop = window.innerWidth >= 768; 
      if(this.isDesktop) this.sidebarOpen = true; 
    },
    openMobileSidebar() { this.mobileSidebarOpen = true; },
    closeMobileSidebar() { this.mobileSidebarOpen = false; }
  }
};
</script>

<style scoped>
/* Scrollbar */
aside::-webkit-scrollbar {
  width: 6px;
}
aside::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.15);
  border-radius: 3px;
}

/* Logo hover */
.logo {
  transition: transform 0.3s ease;
}
.logo:hover {
  transform: scale(1.05);
}

/* Menu hover */
.menu-item {
  transition: all 0.3s ease;
}
.menu-item:hover {
  transform: translateX(3px);
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}
</style>
