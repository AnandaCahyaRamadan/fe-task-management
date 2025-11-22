<template>
  <main class="flex-1 p-6 overflow-auto bg-gray-100">
    <h3 class="text-2xl font-semibold mb-6">Profil Saya</h3>

    <div class="bg-white shadow-lg rounded-xl p-6 w-full mx-auto">
      <form @submit.prevent="updateProfile" class="space-y-6">
        <!-- Avatar -->
        <div class="flex flex-col items-center">
          <img
            :src="previewImage || user.imageUrl || defaultAvatar"
            alt=""
            class="w-32 h-32 rounded-full object-cover mb-2 border-2 border-gray-200"
          />
          <input type="file" accept="image/*" @change="onImageChange"/>
        </div>

        <!-- Name -->
        <div>
          <label class="block text-gray-500 font-medium mb-1">Nama</label>
          <input
            type="text"
            v-model="user.name"
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-gray-500 font-medium mb-1">Email</label>
          <input
            type="email"
            v-model="user.email"
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-gray-500 font-medium mb-1">Password Baru</label>
          <input
            type="password"
            v-model="password"
            placeholder="Kosongkan jika tidak ingin mengganti"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <!-- Konfirmasi Password -->
        <div>
          <label class="block text-gray-500 font-medium mb-1">Konfirmasi Password</label>
          <input
            type="password"
            v-model="password_confirmation"
            placeholder="Ulangi password baru"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div class="text-center">
          <button
            type="submit"
            class="bg-primary text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            :disabled="loading"
          >
            <span v-if="!loading">Simpan Perubahan</span>
            <span v-else class="flex items-center gap-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              Menyimpan...
            </span>
          </button>
        </div>

      </form>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        imageUrl: null
      },
      selectedFile: null,
      previewImage: null,
      defaultAvatar: "https://via.placeholder.com/150",
      password: "",
      password_confirmation: "",
      loading: false
    };
  },
  mounted() {
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const userData = res.data.data;
        this.user.name = userData.name;
        this.user.email = userData.email;
        this.user.imageUrl = userData.image ? `http://localhost:8000/storage/${userData.image}` : null;
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Gagal memuat profil", "error");
      }
    },
    onImageChange(event) {
      const file = event.target.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire("Error", "Ukuran file maksimal 2MB", "error");
        return;
      }
      this.selectedFile = file;
      this.previewImage = URL.createObjectURL(file);
    },
    async updateProfile() {
      this.loading = true;
      try {
        const token = localStorage.getItem("token");
        const formData = new FormData();

        formData.append("_method", "PUT");
        formData.append("name", this.user.name);
        formData.append("email", this.user.email);

        if (this.password) {
          formData.append("password", this.password);
          formData.append("password_confirmation", this.password_confirmation);
        }

        if (this.selectedFile) {
          formData.append("image", this.selectedFile);
        }

        const res = await axios.post("http://localhost:8000/api/profile", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        });

        const updatedUser = res.data.data;
        this.user.name = updatedUser.name;
        this.user.email = updatedUser.email;
        this.user.imageUrl = updatedUser.image ? `http://localhost:8000/storage/${updatedUser.image}` : null;

        localStorage.setItem("user", JSON.stringify(updatedUser));
        this.selectedFile = null;
        this.password = "";
        this.password_confirmation = "";

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Profil berhasil diperbarui",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true
        });
      } catch (err) {
        console.error(err.response.data);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: err.response.data.message || "Gagal memperbarui profil",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true
        });
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
  input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
</style>
