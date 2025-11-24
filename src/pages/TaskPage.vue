<template>
  <div class="p-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold mb-6">Daftar Task</h2>
      <template v-if="userLogged.parent == null">
          <button
            @click="openModal()"
            class="bg-primary text-white font-semibold px-6 py-2 rounded-xl transition flex items-center gap-2 mb-6"
          >
            <i class="fas fa-plus"></i> Tambah Task
          </button>
      </template>
    </div>

    <!-- Modal -->
    <transition name="fade">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4"  style="background-color: rgba(0, 0, 0, 0.5);">

        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/50" @click="closeModal"></div>

        <!-- Modal Box -->
        <div class="bg-white w-full max-w-xl rounded-2xl shadow-xl z-10 flex flex-col max-h-[90vh] overflow-hidden">

          <button class="absolute top-3 right-4 text-gray-500 text-xl" @click="closeModal">✕</button>

          <div class="px-6 pt-6 pb-4 border-b">
            <h2 class="text-2xl font-bold text-center text-primary">{{ editId ? "Edit Task" : "Tambah Task" }}</h2>
          </div>

          <div class="px-6 py-4 space-y-4 overflow-y-auto" style="max-height:60vh">

            <!-- Title -->
            <div>
              <input v-model="form.title" type="text" placeholder="Judul Task"
                class="w-full px-4 py-3 rounded-lg border border-gray-200" />
              <p v-if="errors.title" class="text-red-500 text-xs mt-1">{{ errors.title[0] }}</p>
            </div>

            <!-- Description -->
            <div>
              <textarea v-model="form.description" placeholder="Deskripsi" rows="3"
                class="w-full px-4 py-3 rounded-lg border border-gray-200"></textarea>
            </div>

            <!-- Deadline -->
            <div  v-if="userLogged.parent == null">
              <input v-model="form.deadline" type="datetime-local"
                class="w-full px-4 py-3 rounded-lg border border-gray-200" />
              <p v-if="errors.deadline" class="text-red-500 text-xs mt-1">
                {{ errors.deadline[0] }}
              </p>
            </div>

            <!-- Status (NEW) -->
            <div>
              <select
                v-model="form.status"
                class="w-full px-4 py-3 rounded-lg border border-gray-200"
              >
                <option value="">Pilih Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <p v-if="errors.status" class="text-red-500 text-xs mt-1">{{ errors.status[0] }}</p>
            </div>

            <!-- Assign -->
            <div  v-if="userLogged.parent == null">
              <select v-model="form.assigned_to"
                class="w-full px-4 py-3 rounded-lg border border-gray-200">
                <option value="">Pilih User</option>
                <option v-for="u in assignable" :key="u.id" :value="u.id">{{ u.name }}</option>
              </select>
              <p v-if="errors.assigned_to" class="text-red-500 text-xs mt-1">{{ errors.assigned_to[0] }}</p>
            </div>

          </div>

          <div class="px-6 py-4 border-t flex gap-2">
            <button @click="submitTask" :disabled="loading"
              class="w-full bg-primary text-white py-3 rounded-lg flex justify-center items-center gap-2">
              <span v-if="!loading">{{ editId ? "Update" : "Tambah" }} Task</span>
              <span v-else class="flex items-center gap-2">
                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10"
                    stroke="currentColor" stroke-width="4"></circle><path class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
                Menyimpan...
              </span>
            </button>
            <button @click="closeModal" class="w-full bg-gray-500 text-white py-3 rounded-lg">Batal</button>
          </div>

        </div>
      </div>
    </transition>

    <!-- Table -->
    <div class="bg-white shadow-lg rounded-xl p-6 mt-6">
      <h3 class="text-lg font-semibold mb-4">List Task</h3>

      <vue-good-table :columns="columns" :rows="tasksWithIndex"
        :search-options="{ enabled: true }"
        :pagination-options="{ enabled: true, perPage: 5 }">

        <template #table-row="{ column, row }">

          <!-- BADGE STATUS (NEW) -->
          <span v-if="column.field === 'status'">
            <span
              :class="{
                      'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full': row.status === 'pending',
                      'bg-purple-100 text-purple-800 px-2 py-1 rounded-full': row.status === 'in_progress',
                      'bg-green-100 text-green-800 px-2 py-1 rounded-full': row.status === 'completed'
                    }"
            >
              {{ row.status }}
            </span>
          </span>

          <span v-else-if="column.field === 'deadline'" 
                :class="{
                  'bg-red-100 text-red-800 px-2 py-1 rounded-full': new Date(row.deadline) < new Date()
                }">
            {{ formatDate(row.deadline) }}
          </span>

          <!-- ACTION BUTTON -->
          <span v-if="column.field === 'actions'">
            <button class="text-primary px-1" @click="editTask(row)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="text-blue-500 px-1" @click="detailTask(row.id)">
              <i class="fas fa-eye"></i>
            </button>
            <button class="text-red-500 px-1" @click="deleteTask(row.id)">
              <i class="fas fa-trash"></i>
            </button>
          </span>

        </template>
      </vue-good-table>
    </div>

  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { VueGoodTable } from "vue-good-table-next";
import router from "../router";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default {
  components: { VueGoodTable },

  setup() {
    const tasks = ref([]);
    const assignable = ref([]);
    const errors = ref({});
    const loading = ref(false);
    const isModalOpen = ref(false);
    const editId = ref(null);
    const userLogged = ref({});
    

    const form = ref({
      title: "",
      description: "",
      deadline: "",
      assigned_to: "",
      status: "pending",   // NEW
    });

    const columns = [
      { label: "No", field: "index" },
      { label: "Judul", field: "title" },
      { label: "Deadline", field: "deadline" },
      { label: "Assign Ke", field: "assigned_user.name" },
      { label: "Status", field: "status" }, // NEW
      { label: "Aksi", field: "actions" },
    ];

    const tasksWithIndex = computed(() =>
      tasks.value.map((t, i) => ({ ...t, index: i + 1 }))
    );

    const fetchTasks = async () => {
      const res = await axios.get("/tasks");
      tasks.value = res.data.data;
    };

    const fetchAssignable = async () => {
      const res = await axios.get("/assignable-users");
      assignable.value = res.data.data;
    };

    const openModal = (t = null) => {
      if (t) {
        editId.value = t.id;
        form.value = {
          title: t.title,
          description: t.description,
          deadline: t.deadline,
          assigned_to: t.assigned_to,
          status: t.status, // NEW
        };
      }
      isModalOpen.value = true;
    };

    const closeModal = () => {
      editId.value = null;
      errors.value = {};
      form.value = {
        title: "",
        description: "",
        deadline: "",
        assigned_to: "",
        status: "pending", // NEW
      };
      isModalOpen.value = false;
    };

    const submitTask = async () => {
      loading.value = true;
      errors.value = {};

      try {
        if (editId.value) {
          await axios.put(`/tasks/${editId.value}`, form.value);
        } else {
          await axios.post(`/tasks`, form.value);
        }

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Task disimpan",
          showConfirmButton: false,
          timer: 1200,
        });

        closeModal();
        fetchTasks();
      } catch (e) {
        errors.value = e.response?.data?.errors || {};
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Gagal menyimpan",
          showConfirmButton: false,
          timer: 1200,
        });
      } finally {
        loading.value = false;
      }
    };

    const deleteTask = async (id) => {
      const ok = await Swal.fire({
        title: "Yakin hapus?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00A884",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal",
        text: "Data task akan dihapus permanen!",
      });

      if (!ok.isConfirmed) return;

      await axios.delete(`/tasks/${id}`);
      fetchTasks();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Task dihapus",
        showConfirmButton: false,
        timer: 1200,
      });
    };

    const editTask = (t) => openModal(t);

    onMounted(() => {
      fetchTasks();
      fetchAssignable();
        const user = localStorage.getItem("user");
        if (user) {
            userLogged.value = JSON.parse(user);
        }
        console.log(userLogged.value);
    });

    const detailTask = (id) => {
        router.push(`/dashboard/tasks/${id}/detail`);
    };

    const formatDate  = (dateStr) => {
      if (!dateStr) return "-";
      const date = new Date(dateStr);
      const day = String(date.getDate()).padStart(2, "0");
      const month = date.toLocaleString("id-ID", { month: "long" });
      const year = date.getFullYear();
      const hour = String(date.getHours()).padStart(2, "0");
      const minute = String(date.getMinutes()).padStart(2, "0");
      return `${day} ${month} ${year}, ${hour}:${minute}`;
    }

    return {
      tasks,
      assignable,
      errors,
      loading,
      isModalOpen,
      editId,
      form,
      columns,
      tasksWithIndex,
      openModal,
      closeModal,
      submitTask,
      deleteTask,
      editTask,
      userLogged,
      detailTask,
      formatDate
    };
  },
};
</script>
