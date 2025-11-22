<template>
  <div class="flex h-screen bg-gray-100 font-jakarta">
    <SidebarComponent @logout="logout" />
    <div class="flex-1 flex flex-col">
      <HeaderComponent :user="user" />
      <router-view />
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
        user: { name: "", email: "" }
      };
    },
    mounted() {
      const storedUser = localStorage.getItem("user");
      if (storedUser) this.user = JSON.parse(storedUser);
      else this.$router.push("/login");
    },
    methods: {
      async logout() {
        const token = localStorage.getItem("token");
        if (!token) { this.$router.push("/login"); return; }

        try {
          await axios.post(
            "http://localhost:8000/api/logout",
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );

          localStorage.removeItem("token");
          localStorage.removeItem("user");

          Swal.fire({
            toast: true, position: "top-end", icon: "success",
            title: "Logout berhasil", showConfirmButton: false,
            timer: 1000, timerProgressBar: true
          });

          setTimeout(() => this.$router.push("/login"), 1000);

        } catch (error) {
          Swal.fire({
            toast: true, position: "top-end", icon: "error",
            title: "Logout gagal", showConfirmButton: false,
            timer: 1000, timerProgressBar: true
          });
        }
      }
    }
  };
</script>
