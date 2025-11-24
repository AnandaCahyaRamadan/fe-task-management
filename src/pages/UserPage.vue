<template>
  <div class="p-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold mb-6">Daftar User</h2>
      <button
        @click="openModal()"
        class="bg-primary text-white font-semibold px-6 py-2 rounded-xl transition flex items-center gap-2 mb-6"
      >
        <i class="fas fa-plus"></i> Tambah User
      </button>
    </div>

    <!-- Modal -->
    <transition name="fade">
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">

        <!-- Overlay -->
        <div
        class="absolute inset-0"
        @click="closeModal"
        style="background-color: rgba(0, 0, 0, 0.5);"
        ></div>

        <!-- Modal Content -->
        <transition name="slide-fade">
        <div
            class="bg-white shadow-lg rounded-2xl w-full max-w-lg z-10 flex flex-col
                max-h-[90vh] overflow-hidden relative"
        >
            <!-- Close Button -->
            <button
            @click="closeModal"
            class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
            ✕
            </button>

            <!-- HEADER -->
            <div class="px-8 pt-6 pb-4 border-b">
            <h3 class="text-2xl font-bold text-center text-primary tracking-wide">
                {{ editId ? "Edit User" : "Tambah User" }}
            </h3>
            </div>

            <!-- BODY — scrollable -->
            <div class="px-8 py-4 overflow-y-auto space-y-5" style="max-height: 60vh">

            <!-- Name -->
            <div>
                <input
                v-model="form.name"
                type="text"
                placeholder="Nama"
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
                class="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
                <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email[0] }}</p>
            </div>

            <!-- Role -->
            <div>
                <select
                v-model="form.role_id"
                class="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 text-gray-700 placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                >
                <option value="">Pilih Role</option>
                <option v-for="r in roles" :key="r.id" :value="r.id">{{ r.name }}</option>
                </select>
                <p v-if="errors.role_id" class="text-red-500 text-xs mt-1">{{ errors.role_id[0] }}</p>
            </div>

            <!-- User Type -->
            <div>
                <select
                v-model="form.user_type_id"
                class="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 text-gray-700 placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                >
                <option value="">Pilih User Type</option>
                <option v-for="t in userTypes" :key="t.id" :value="t.id">{{ t.name }}</option>
                </select>
                <p v-if="errors.user_type_id" class="text-red-500 text-xs mt-1">{{ errors.user_type_id[0] }}</p>
            </div>

            <!-- Parent -->
            <div>
                <input
                v-model="form.parent"
                type="text"
                placeholder="Parent (opsional)"
                class="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
            </div>

            <!-- Password -->
            <div>
                <input
                v-model="form.password"
                type="password"
                placeholder="Password"
                class="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
                <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password[0] }}</p>
            </div>

            <!-- Confirm Password -->
            <div>
                <input
                v-model="form.password_confirmation"
                type="password"
                placeholder="Konfirmasi Password"
                class="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
                <p v-if="errors.password_confirmation" class="text-red-500 text-xs mt-1">{{ errors.password_confirmation[0] }}</p>
            </div>

            <!-- Image -->
            <div>
                <input
                type="file"
                accept="image/*"
                @change="handleImage"
                class="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
                <p v-if="errors.image" class="text-red-500 text-xs mt-1">{{ errors.image[0] }}</p>
            </div>

            </div>

            <!-- FOOTER -->
            <div class="px-8 py-4 border-t flex space-x-2">

                <button
                  type="submit" @click="submitUser"
                  class="w-full bg-primary text-white py-3 rounded-lg flex justify-center items-center gap-2 font-medium transition"
                  :disabled="loading"
                >
                  <span v-if="!loading">{{ editId ? "Update User" : "Tambah User" }}</span>
                  <span v-else class="flex items-center gap-2">
                    <svg
                      class="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                              stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z">
                      </path>
                    </svg>
                    {{ editId ? "Updating..." : "Adding..." }}
                  </span>
                </button>

                <button
                  @click.prevent="closeModal"
                  class="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg transition"
                >
                  Batal
                </button>
            </div>

        </div>
        </transition>

    </div>
    </transition>

    <!-- Datatable -->
    <div class="bg-white shadow-lg rounded-xl p-6 mt-6">
      <h3 class="text-lg font-semibold mb-4">List User</h3>

      <vue-good-table
        :columns="columns"
        :rows="usersWithIndex"
        :search-options="{ enabled: true }"
        :pagination-options="{ enabled: true, perPage: 5 }"
      >
        <template #table-row="{ column, row }">

          <span v-if="column.field === 'image'">
            <img :src="row.image_url" class="w-10 h-10 rounded-full object-cover" />
          </span>

          <span v-if="column.field === 'actions'">
            <button @click="editUser(row)" class="text-primary px-1"><i class="fas fa-edit"></i></button>
            <button @click="deleteUser(row.id)" class="text-red-500 px-1"><i class="fas fa-trash"></i></button>
          </span>

        </template>
      </vue-good-table>
    </div>

  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { VueGoodTable } from "vue-good-table-next";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default {
components: { VueGoodTable },

setup() {
    const users = ref([]);
    const roles = ref([]);
    const userTypes = ref([]);

    const loading = ref(false); // <-- LOADING DITAMBAHKAN

    const form = ref({
      name: "",
      email: "",
      role_id: "",
      user_type_id: "",
      parent: "",
      password: "",
      password_confirmation: "",
      image: null,
    });

    const editId = ref(null);
    const errors = ref({});
    const isModalOpen = ref(false);

    const columns = [
      { label: "No", field: "index" },
      { label: "Foto", field: "image" },
      { label: "Nama", field: "name" },
      { label: "Email", field: "email" },
      { label: "Role", field: "role.name" },
      { label: "User", field: "usertype.name" },
      { label: "Aksi", field: "actions" },
    ];

    const usersWithIndex = computed(() =>
      users.value.map((u, i) => ({
        ...u,
        index: i + 1,
        image_url: u.image ? `http://localhost:8000/storage/${u.image}` : "/default.png",
      }))
    );

    const fetchUsers = async () => {
      const res = await axios.get("/users");
      users.value = res.data.data;
    };

    const fetchMetadata = async () => {
      const r = await axios.get("/roles");
      const t = await axios.get("/user-type");

      roles.value = r.data.data;
      userTypes.value = t.data.data;
    };

    const openModal = (u = null) => {
      if (u) {
        editId.value = u.id;
        form.value = {
          name: u.name,
          email: u.email,
          role_id: u.role_id,
          user_type_id: u.user_type_id,
          parent: u.parent,
          password: "",
          password_confirmation: "",
          image: null,
        };
      }
      isModalOpen.value = true;
    };

    const closeModal = () => {
      editId.value = null;
      errors.value = {};

      form.value = {
        name: "",
        email: "",
        role_id: "",
        user_type_id: "",
        parent: "",
        password: "",
        password_confirmation: "",
        image: null,
      };

      isModalOpen.value = false;
    };

    const handleImage = (e) => {
      form.value.image = e.target.files[0];
    };

    // =======================================
    //       FIXED SUBMIT DENGAN LOADING
    // =======================================
    const submitUser = async () => {
      loading.value = true;        // <-- MULAI LOADING
      errors.value = {};           // Clear error sebelumnya

      let data = new FormData();
      Object.keys(form.value).forEach((key) => {
        if (form.value[key] !== null && form.value[key] !== "") {
          data.append(key, form.value[key]);
        }
      });

      try {
        if (editId.value) {
          data.append("_method", "PUT");
          await axios.post(`/users/${editId.value}`, data);
        } else {
          await axios.post("/users", data);
        }

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "User berhasil disimpan",
          showConfirmButton: false,
          timer: 1200,
          timerProgressBar: true
        });

        closeModal();
        fetchUsers();
      } catch (e) {
        errors.value = e.response?.data?.errors || {};

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "User gagal disimpan",
          showConfirmButton: false,
          timer: 1200,
          timerProgressBar: true
        });
      } finally {
        loading.value = false;  // <-- AKHIRI LOADING APA PUN HASILNYA
      }
    };

    const deleteUser = async (id) => {
      try {
        const ok = await Swal.fire({
          title: "Apakah kamu yakin?",
          text: "Data User akan dihapus permanen!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#00A884",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, hapus!",
          cancelButtonText: "Batal",
        });

        if (!ok.isConfirmed) return;

        await axios.delete(`/users/${id}`);

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "User berhasil dihapus",
          showConfirmButton: false,
          timer: 1200,
          timerProgressBar: true
        });

        fetchUsers();
      } catch (err) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          text: err.response?.data?.message || "Terjadi kesalahan pada server.",
          showConfirmButton: false,
          timer: 1200,
          timerProgressBar: true
        });
      }
    };

    const editUser = (u) => {
      openModal(u);
    };

    onMounted(() => {
      fetchUsers();
      fetchMetadata();
    });

    return {
      users,
      roles,
      userTypes,
      usersWithIndex,
      form,
      editId,
      errors,
      columns,
      isModalOpen,
      loading,   // <-- RETURN loading ke template
      openModal,
      closeModal,
      handleImage,
      submitUser,
      deleteUser,
      editUser,
    };
  },
};
</script>

