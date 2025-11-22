<template>
  <div class="p-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold mb-6">Daftar Member</h2>
      <button
        @click="openModal()"
        class="bg-primary text-white font-semibold px-6 py-2 rounded-xl transition flex items-center gap-2 mb-6"
      >
        <i class="fas fa-plus"></i> Tambah Member
      </button>
    </div>

    <!-- Modal -->
    <transition name="fade">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Overlay -->
        <div
          class="absolute inset-0"
          @click="closeModal"
          style="background-color: rgba(0, 0, 0, 0.5);"
        ></div>

        <!-- Modal Content -->
        <transition name="slide-fade">
        <div
            class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg z-10 transform transition hover:shadow-2xl hover:scale-[1.01] relative"
        >
            <button
            @click="closeModal"
            class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
            ✕
            </button>
            <h3 class="text-2xl font-bold text-center mb-6 text-primary tracking-wide">
            {{ editId ? "Edit Member" : "Tambah Member" }}
            </h3>

            <form @submit.prevent="submitMember" class="space-y-5">
            <!-- Name -->
            <div>
                <input
                v-model="form.name"
                type="text"
                placeholder="Nama"
                :disabled="loading"
                class="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
                <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name[0] }}</p>
            </div>

            <!-- Email -->
            <div>
                <input
                v-model="form.email"
                type="email"
                placeholder="Email"
                :disabled="loading"
                class="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
                <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email[0] }}</p>
            </div>

            <!-- Password -->
            <div>
                <input
                v-model="form.password"
                type="password"
                placeholder="Password"
                :disabled="loading"
                class="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
                <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password[0] }}</p>
            </div>

            <!-- Password Confirmation -->
            <div>
                <input
                v-model="form.password_confirmation"
                type="password"
                placeholder="Konfirmasi Password"
                :disabled="loading"
                class="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
                <p v-if="errors.password_confirmation" class="text-red-500 text-xs mt-1">{{ errors.password_confirmation[0] }}</p>
            </div>

            <!-- Image -->
            <div>
                <input
                @change="handleImage"
                type="file"
                accept="image/*"
                :disabled="loading"
                class="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
                <p v-if="errors.image" class="text-red-500 text-xs mt-1">{{ errors.image[0] }}</p>
            </div>

            <!-- Submit & Cancel -->
            <div class="flex space-x-2">
                <button
                type="submit"
                class="w-full bg-primary text-white py-3 rounded-lg flex justify-center items-center gap-2 font-medium transition"
                :disabled="loading"
                >
                <span v-if="!loading">{{ editId ? "Update Member" : "Tambah Member" }}</span>
                <span v-else class="flex items-center gap-2">
                    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    {{ editId ? "Updating..." : "Adding..." }}
                </span>
                </button>
                <button
                @click.prevent="closeModal"
                class="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg flex justify-center items-center gap-2 font-medium transition"
                >
                Batal
                </button>
            </div>
            </form>
        </div>
        </transition>
      </div>
    </transition>

    <!-- Table Member -->
    <div class="bg-white shadow-lg rounded-xl p-6 mx-auto mt-6">
      <h3 class="text-lg font-semibold mb-4">List Member</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-200">
            <thead>
                <tr class="bg-gray-100">
                <th class="p-3 border">#</th>
                <th class="p-3 border">Nama</th>
                <th class="p-3 border">Email</th>
                <th class="p-3 border">Aksi</th>
                </tr>
            </thead>
            <transition-group tag="tbody" name="fade">
                <tr
                v-for="(member, index) in members"
                :key="member.id"
                class="hover:bg-gray-50 transition"
                >
                <td class="p-3 border">{{ index + 1 }}</td>
                <td class="p-3 border">{{ member.name }}</td>
                <td class="p-3 border">{{ member.email }}</td>
                <td class="p-3 border space-x-2 flex">
                    <button
                    @click="openModal(member)"
                    class="text-primary font-semibold py-2 rounded-xl transition flex items-center gap-2"
                    >
                    <i class="fas fa-edit"></i>
                    </button>
                    <button
                    @click="deleteMember(member.id)"
                    class="text-red-500 font-semibold py-2 rounded-xl transition flex items-center gap-2"
                    :disabled="deleteLoading"
                    >
                    <i v-if="!deleteLoading" class="fas fa-trash"></i>
                    <i v-else class="fas fa-spinner fa-spin"></i>
                    {{ deleteLoading ? "Deleting..." : "" }}
                    </button>
                </td>
                </tr>
                <tr v-if="members.length === 0" :key="'no-member'">
                <td colspan="4" class="p-3 text-center text-gray-500">
                    Tidak ada member.
                </td>
                </tr>
            </transition-group>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  setup() {
    const members = ref([]);
    const form = ref({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      image: null,
    });
    const editId = ref(null);
    const isModalOpen = ref(false);
    const errors = ref({});
    const loading = ref(false);
    const deleteLoading = ref(false);

    const fetchMembers = async () => {
      try {
        const res = await axios.get("/member");
        members.value = res.data.data;
      } catch (error) {
        console.error(error.response?.data);
      }
    };

    const handleImage = (event) => {
      form.value.image = event.target.files[0];
    };

    const submitMember = async () => {
        errors.value = {};
        loading.value = true;

        const data = new FormData();
        data.append("name", form.value.name);
        data.append("email", form.value.email);
        if (form.value.password) {
            data.append("password", form.value.password);
            data.append("password_confirmation", form.value.password_confirmation);
        }
        if (form.value.image) data.append("image", form.value.image);

        try {
            if (editId.value) {
            data.append("_method", "PUT");
            await axios.post(`/member/${editId.value}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Member berhasil diupdate",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true
            });
            } else {
            await axios.post("/member", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Member berhasil ditambahkan",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true
            });
            }

            resetForm();
            closeModal();
            await fetchMembers();

        } catch (error) {
            if (error.response?.status === 422) {
            // Error validasi backend
            errors.value = error.response.data.errors;
            loading.value = false; // <--- pastikan loading dimatikan di sini
            } else {
            console.error(error.response?.data);
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "Terjadi kesalahan",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true
            });
            }
        } finally {
            // Pastikan loading dimatikan juga untuk error selain 422
            loading.value = false;
        }
    };


    const editMember = (member) => {
      editId.value = member.id;
      form.value.name = member.name;
      form.value.email = member.email;
      form.value.password = "";
      form.value.password_confirmation = "";
      form.value.image = null;
      openModal();
    };

    const deleteMember = async (id) => {
      const result = await Swal.fire({
        title: "Apakah kamu yakin?",
        text: "Data member akan dihapus permanen!",
        icon: "warning",
        confirmButtonColor: '#00A884',
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (!result.isConfirmed) return;

      deleteLoading.value = true;
      try {
        await axios.delete(`/member/${id}`);

        // Hapus member secara lokal
        members.value = members.value.filter(m => m.id !== id);
        await nextTick(); // tunggu DOM patch selesai

        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Member berhasil dihapus",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true
        });
      } catch (error) {
        console.error(error.response?.data);
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "Gagal menghapus member",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true
        });
      } finally {
        deleteLoading.value = false;
      }
    };

    const resetForm = () => {
      editId.value = null;
      form.value = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        image: null,
      };
      errors.value = {};
    };

    const openModal = (member = null) => {
      if (member) editMember(member);
      isModalOpen.value = true;
    };

    const closeModal = () => {
      resetForm();
      isModalOpen.value = false;
    };

    onMounted(() => {
      fetchMembers();
    });

    return {
      members,
      form,
      editId,
      isModalOpen,
      errors,
      loading,
      deleteLoading,
      fetchMembers,
      handleImage,
      submitMember,
      editMember,
      deleteMember,
      openModal,
      closeModal,
      resetForm,
    };
  },
};
</script>
