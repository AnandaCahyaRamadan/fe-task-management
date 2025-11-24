<template>
  <div class="p-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold mb-6">Detail Task : {{ task?.title }}</h2>
        <button
        @click="openModal()"
        class="bg-primary text-white font-semibold px-6 py-2 rounded-xl transition flex items-center gap-2 mb-6"
        >
        <i class="fas fa-plus"></i> Tambah Detail Task
        </button>
    </div>

    <!-- Modal -->
    <transition name="fade">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" style="background-color: rgba(0, 0, 0, 0.5);">
        <div class="absolute inset-0 bg-black/50" @click="closeModal"></div>
        <div class="bg-white w-full max-w-lg rounded-2xl shadow-xl z-10 flex flex-col max-h-[90vh] overflow-hidden">
          <button class="absolute top-3 right-4 text-gray-500 text-xl" @click="closeModal">✕</button>
          <div class="px-6 pt-6 pb-4 border-b">
            <h2 class="text-2xl font-bold text-center text-primary">
              {{ editId ? "Edit Detail Task" : "Tambah Detail Task" }}
            </h2>
          </div>
          <div class="px-6 py-4 space-y-4 overflow-y-auto" style="max-height:60vh">
            <div>
              <input 
                v-model="form.sub_title" 
                type="text" 
                placeholder="Sub Judul"
                class="w-full px-4 py-3 rounded-lg border border-gray-200"
              />
              <p v-if="errors.sub_title" class="text-red-500 text-xs mt-1">{{ errors.sub_title[0] }}</p>
            </div>
            <div>
              <textarea
                v-model="form.note"
                placeholder="Catatan / Note..."
                rows="4"
                class="w-full px-4 py-3 rounded-lg border border-gray-200"
              ></textarea>
              <p v-if="errors.note" class="text-red-500 text-xs mt-1">{{ errors.note[0] }}</p>
            </div>
          </div>
          <div class="px-6 py-4 border-t flex gap-2">
            <button @click="submitDetail" :disabled="loading"
              class="w-full bg-primary text-white py-3 rounded-lg flex justify-center items-center gap-2">
              <span v-if="!loading">{{ editId ? "Update" : "Tambah" }} Detail</span>
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

    <!-- VueGoodTable -->
    <div class="bg-white shadow-lg rounded-xl p-6 mt-6">
      <h3 class="text-lg font-semibold mb-4">List Detail Task</h3>

      <vue-good-table
        :columns="columns"
        :rows="detailsWithIndex"
        :search-options="{ enabled: true }"
        :pagination-options="{ enabled: true, perPage: 5 }"
      >
        <template #table-row="{ column, row }">
          <span v-if="column.field === 'actions'">
            <button class="text-primary px-1" @click="editDetail(row)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="text-red-500 px-1" @click="deleteDetail(row.id)">
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

export default {
  props: ["id"],
  components: { VueGoodTable },

  setup(props) {
    const task = ref(null);
    const details = ref([]);
    const isModalOpen = ref(false);
    const editId = ref(null);
    const loading = ref(false);
    const errors = ref({});

    const form = ref({
      sub_title: "",
      note: ""
    });

    const columns = [
      { label: "No", field: "index" },
      { label: "Sub Title", field: "sub_title" },
      { label: "Note", field: "note" },
      { label: "Aksi", field: "actions" },
    ];

    const detailsWithIndex = computed(() =>
      details.value.map((d, i) => ({ ...d, index: i + 1 }))
    );

    const fetchDetails = async () => {
      const res = await axios.get(`/tasks/${props.id}/details`);
      details.value = res.data.data;
    };

    const fetchTask = async () => {
      const res = await axios.get(`/tasks/${props.id}`);
      task.value = res.data.data;
    };

    const openModal = (d = null) => {
      if (d) {
        editId.value = d.id;
        form.value = { sub_title: d.sub_title, note: d.note };
      }
      isModalOpen.value = true;
    };

    const closeModal = () => {
      editId.value = null;
      errors.value = {};
      form.value = { sub_title: "", note: "" };
      isModalOpen.value = false;
    };

    const submitDetail = async () => {
      loading.value = true;
      errors.value = {};

      try {
        if (editId.value) {
          await axios.put(`/details/${editId.value}`, form.value);
        } else {
          await axios.post(`/tasks/${props.id}/details`, form.value);
        }

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Detail disimpan",
          showConfirmButton: false,
          timer: 1200,
        });

        closeModal();
        fetchDetails();
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

    const editDetail = (d) => openModal(d);

    const deleteDetail = async (id) => {
      const ok = await Swal.fire({
        title: "Yakin hapus?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00A884",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal",
        text: "Data detail akan dihapus permanen!",
      });

      if (!ok.isConfirmed) return;

      await axios.delete(`/details/${id}`);
      fetchDetails();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Detail dihapus",
        showConfirmButton: false,
        timer: 1200,
      });
    };

    onMounted(() => {
      fetchTask();
      fetchDetails();
    });

    return {
      task,
      details,
      detailsWithIndex,
      form,
      isModalOpen,
      editId,
      loading,
      errors,
      columns,
      openModal,
      closeModal,
      submitDetail,
      editDetail,
      deleteDetail
    };
  },
};
</script>
