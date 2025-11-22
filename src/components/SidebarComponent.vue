<template>
  <aside class="bg-white w-64 shadow-md flex-shrink-0">
    <div class="p-6 text-center border-b">
      <h1 class="font-bold text-xl text-primary">MyApp</h1>
    </div>
    <nav class="mt-6">
      <ul>
        <li>
          <router-link 
            to="/dashboard" 
            class="block py-3 px-6 text-gray-700 hover:bg-primary/10 hover:text-primary transition"
          >
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link 
            to="/profile" 
            class="block py-3 px-6 text-gray-700 hover:bg-primary/10 hover:text-primary transition"
          >
            Profile
          </router-link>
        </li>
        <li>
          <button 
            @click="$emit('logout')"
            class="w-full text-left py-3 px-6 text-gray-700 hover:bg-red-100 hover:text-red-500 transition"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "SidebarComponent"
};
</script>
