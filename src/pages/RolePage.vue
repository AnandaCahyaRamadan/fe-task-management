<template>
  <div class="p-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold mb-6">Daftar Role</h2>
      <button
        @click="openModal()"
        class="bg-primary text-white font-semibold px-6 py-2 rounded-xl transition flex items-center gap-2 mb-6"
      >
        <i class="fas fa-plus"></i> Tambah Role
      </button>
    </div>

    <!-- Modal -->
    <transition name="fade">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center">
        <div
          class="absolute inset-0"
          @click="closeModal"
          style="background-color: rgba(0, 0, 0, 0.5);"
        ></div>

        <transition name="slide-fade">
          <div
            class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg z-10 transform transition hover:shadow-2xl hover:scale-[1.01] relative"
          >
            <button
              @click="closeModal"
              class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >✕</button>

            <h3 class="text-2xl font-bold text-center mb-6 text-primary tracking-wide">
              {{ editId ? "Edit Role" : "Tambah Role" }}
            </h3>

            <form @submit.prevent="submitRole" class="space-y-5">
              <!-- Name -->
              <div>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Nama Role"
                  class="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
                <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name[0] }}</p>
              </div>

              <!-- Description -->
              <div>
                <textarea
                  v-model="form.description"
                  placeholder="Deskripsi"
                  class="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                ></textarea>
                <p v-if="errors.description" class="text-red-500 text-xs mt-1">
                  {{ errors.description[0] }}
                </p>
              </div>

              <!-- Buttons -->
              <div class="flex space-x-2">
                <button
                  type="submit"
                  class="w-full bg-primary text-white py-3 rounded-lg flex justify-center items-center gap-2 font-medium transition"
                  :disabled="loading"
                >
                  <span v-if="!loading">{{ editId ? "Update Role" : "Tambah Role" }}</span>
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
            </form>
          </div>
        </transition>
      </div>
    </transition>

    <!-- Data Table -->
    <div class="bg-white shadow-lg rounded-xl p-6 mt-6">
      <h3 class="text-lg font-semibold mb-4">List Role</h3>

      <vue-good-table
        :columns="columns"
        :rows="rolesWithIndex"
        :search-options="{ enabled: true }"
        :pagination-options="{ enabled: true, perPage: 5 }"
      >
        <template #table-row="{ column, row }">
          <span v-if="column.field === 'actions'">
            <button @click="editRole(row)" class="text-primary px-1">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="deleteRole(row.id)" class="text-red-500 px-1">
              <i class="fas fa-trash"></i>
            </button>
            </span>
            <span v-else-if="column.field === 'description'">
                {{ row.description ? row.description : '-' }}
            </span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { VueGoodTable } from "vue-good-table-next";
import "vue-good-table-next/dist/vue-good-table-next.css";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default {
  components: { VueGoodTable },

  setup() {
    const roles = ref([]);
    const form = ref({ name: "", description: "" });
    const editId = ref(null);
    const isModalOpen = ref(false);
    const errors = ref({});
    const loading = ref(false);

    const columns = [
      { label: "No", field: "index" },
      { label: "Nama Role", field: "name" },
      { label: "Deskripsi", field: "description" },
      { label: "Aksi", field: "actions" },
    ];

    const rolesWithIndex = computed(() =>
      roles.value.map((r, i) => ({ ...r, index: i + 1 }))
    );

    const fetchRoles = async () => {
      const res = await axios.get("/roles");
      roles.value = res.data.data;
    };

    const resetForm = () => {
      editId.value = null;
      errors.value = {};
      form.value = { name: "", description: "" };
    };

    const openModal = (role = null) => {
      if (role) {
        editId.value = role.id;
        form.value.name = role.name;
        form.value.description = role.description;
      }
      isModalOpen.value = true;
    };

    const closeModal = () => {
      resetForm();
      isModalOpen.value = false;
    };

    const submitRole = async () => {
      loading.value = true;
      errors.value = {};

      try {
        if (editId.value) {
          await axios.put(`/roles/${editId.value}`, form.value);

          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Role berhasil diperbarui",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          await axios.post("/roles", form.value);
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Role berhasil ditambahkan",
            timer: 1000,
            showConfirmButton: false,
          });
        }

        closeModal();
        fetchRoles();
      } catch (error) {
        if (error.response?.status === 422) {
          errors.value = error.response.data.errors;
        } else {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "Terjadi kesalahan",
            timer: 1000,
            showConfirmButton: false,
          });
        }
      } finally {
        loading.value = false;
      }
    };

    const editRole = (role) => openModal(role);

    const deleteRole = async (id) => {
      const result = await Swal.fire({
        title: "Yakin hapus?",
        text: "Data role akan dihapus permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00A884",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (!result.isConfirmed) return;

      await axios.delete(`/roles/${id}`);
      roles.value = roles.value.filter(r => r.id !== id);
      await nextTick();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Role berhasil dihapus",
        timer: 1000,
        showConfirmButton: false,
      });
    };

    onMounted(fetchRoles);

    return {
      roles,
      form,
      editId,
      isModalOpen,
      errors,
      loading,
      columns,
      rolesWithIndex,
      openModal,
      closeModal,
      submitRole,
      editRole,
      deleteRole,
    };
  },
};
</script>

<style scoped>
.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>
