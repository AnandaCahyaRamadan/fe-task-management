<template>
  <div class="flex h-screen bg-gray-100 font-jakarta">
    
    <!-- Sidebar -->
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
              @click="logout"
              class="w-full text-left py-3 px-6 text-gray-700 hover:bg-red-100 hover:text-red-500 transition"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      
      <!-- Header -->
      <header class="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-700">Dashboard</h2>
        <div class="text-gray-600">
          Halo, <span class="font-medium">{{ user.name }}</span>
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1 p-6 overflow-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Card Example -->
          <div class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-semibold mb-2">Statistik</h3>
            <p class="text-gray-500">Contoh data statistik di sini</p>
          </div>

          <div class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-semibold mb-2">Notifikasi</h3>
            <p class="text-gray-500">Contoh notifikasi</p>
          </div>

          <div class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-semibold mb-2">Lainnya</h3>
            <p class="text-gray-500">Konten tambahan</p>
          </div>
        </div>
      </main>
    </div>

  </div>
</template>

<script>
    import axios from "axios";
    import Swal from "sweetalert2";

    export default {
        data() {
            return {
            user: {
                name: "",
                email: ""
            }
            };
        },
        mounted() {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
            this.user = JSON.parse(storedUser);
            } else {
            this.$router.push("/login");
            }
        },
        methods: {
            async logout() {
            const token = localStorage.getItem("token");

            if (!token) {
                this.$router.push("/login");
                return;
            }

            try {
                await axios.post(
                "http://localhost:8000/api/logout",
                {},
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
                );

                // Hapus token dan user info di localStorage
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Logout berhasil",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true
                });

                setTimeout(() => {
                    this.$router.push("/login");
                }, 1000);

            } catch (error) {
                console.error("Logout error:", error);
                Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "Logout gagal",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true
                });
            }
            }
        }
    };
</script>

