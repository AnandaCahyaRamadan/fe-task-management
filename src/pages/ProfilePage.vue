<template>
  <main class="flex-1 p-6 bg-gray-100 min-h-screen">
    <h2 class="text-2xl font-bold mb-6">Profil Saya</h2>

    <div class="bg-white shadow-xl rounded-2xl p-8 mx-auto">
      <form @submit.prevent="updateProfile" class="space-y-5">

        <!-- Avatar -->
        <div class="flex flex-col items-center relative">
          <img
            :src="previewImage || user.imageUrl || defaultAvatar"
            alt="Avatar"
            class="w-28 h-28 rounded-full object-cover border-4 border-gray-200 shadow-sm"
          />
          <label
            class="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-primary/80 transition"
          >
            <i class="fas fa-camera"></i>
            <input type="file" accept="image/*" class="hidden" @change="onImageChange"/>
          </label>
          <p v-if="errors.image" class="text-red-500 text-xs mt-2">{{ errors.image[0] }}</p>
        </div>

        <!-- Name -->
        <div>
          <input
            type="text"
            v-model="user.name"
            required
            placeholder="Nama"
            class="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
          />
          <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name[0] }}</p>
        </div>

        <!-- Email -->
        <div>
          <input
            type="email"
            v-model="user.email"
            required
            placeholder="Email"
            class="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
          />
          <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email[0] }}</p>
        </div>

        <!-- Password -->
        <div>
          <input
            type="password"
            v-model="password"
            placeholder="Password baru (kosongkan jika tidak diganti)"
            class="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
          />
          <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password[0] }}</p>
        </div>

        <!-- Konfirmasi Password -->
        <div>
          <input
            type="password"
            v-model="password_confirmation"
            placeholder="Ulangi password baru"
            class="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
          />
          <p v-if="errors.password_confirmation" class="text-red-500 text-xs mt-1">{{ errors.password_confirmation[0] }}</p>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="w-full bg-primary text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2 transition"
            :disabled="loading"
          >
            <span v-if="!loading"><i class="fas fa-save"></i> Simpan Perubahan</span>
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
      loading: false,
      errors: {} // <-- tambahkan ini
    };
  },
  mounted() {
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/profile", {
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
      this.errors = {}; // reset error sebelum submit
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

        const res = await axios.post("/profile", formData, {
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
        if (err.response && err.response.status === 422) {
          this.errors = err.response.data.errors; // <-- simpan validasi error
        } else {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: err.response?.data?.message || "Gagal memperbarui profil",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
          });
        }
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
