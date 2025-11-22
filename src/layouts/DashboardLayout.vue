<template>
  <div class="flex h-screen bg-gray-100 font-jakarta overflow-hidden">
    <SidebarComponent v-model="sidebarOpen" ref="sidebar" @logout="logout" />

    <div class="flex-1 flex flex-col overflow-hidden">
      <HeaderComponent
        :user="user"
        :title="'Dashboard'"
        @toggle-sidebar="toggleSidebar"
      />
      <main class="flex-1 p-4 overflow-auto transition-all duration-300">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import SidebarComponent from "@/components/SidebarComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  components: { SidebarComponent, HeaderComponent },
  data() {
    return {
      user: { name: "", email: "" },
      sidebarOpen: window.innerWidth >= 768
    };
  },
  mounted() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) this.user = JSON.parse(storedUser);
    else this.$router.push("/login");
  },
  methods: {
    toggleSidebar() {
      // Desktop: collapse, Mobile: open overlay
      if (window.innerWidth >= 768) {
        this.sidebarOpen = !this.sidebarOpen;
      } else {
        this.$refs.sidebar.openMobileSidebar();
      }
    },

    async logout() {
      const result = await Swal.fire({
        title: 'Logout',
        text: 'Apakah Anda yakin ingin keluar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00A884',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, logout',
        cancelButtonText: 'Batal'
      });

      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        if (!token) { 
          this.$router.push("/login"); 
          return; 
        }

        try {
          await axios.post(
            "http://localhost:8000/api/logout",
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );

          localStorage.removeItem("token");
          localStorage.removeItem("user");

          this.$router.push("/login");
        } catch (error) {
          console.error(error);
          Swal.fire({
              toast: true,
              position: "top-end",
              icon: 'error',
              title: 'Logout gagal',
              text: 'Coba lagi nanti',
              showConfirmButton: true
            });
        }
      }
    }

  }
};
</script>
