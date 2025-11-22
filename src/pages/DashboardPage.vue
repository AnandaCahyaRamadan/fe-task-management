<template>
  <main class="flex-1 p-6 overflow-auto bg-gray-100">
    <!-- Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <!-- Total Task -->
      <div
        class="relative bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition-all duration-300"
      >
        <div class="absolute top-4 right-4 text-4xl opacity-20">
          <i class="fas fa-tasks"></i>
        </div>
        <h3 class="text-lg font-semibold mb-2">Total Task</h3>
        <p class="text-2xl font-bold">{{ totalTasks }}</p>
      </div>

      <!-- Pending -->
      <div
        class="relative bg-gradient-to-r from-yellow-400 to-yellow-300 text-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition-all duration-300"
      >
        <div class="absolute top-4 right-4 text-4xl opacity-20">
          <i class="fas fa-clock"></i>
        </div>
        <h3 class="text-lg font-semibold mb-2">Pending</h3>
        <p class="text-2xl font-bold">{{ tasks.pending.length }}</p>
      </div>

      <!-- In Progress -->
      <div
        class="relative bg-gradient-to-r from-purple-500 to-purple-400 text-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition-all duration-300"
      >
        <div class="absolute top-4 right-4 text-4xl opacity-20">
          <i class="fas fa-spinner"></i>
        </div>
        <h3 class="text-lg font-semibold mb-2">In Progress</h3>
        <p class="text-2xl font-bold">{{ tasks.in_progress.length }}</p>
      </div>

      <!-- Selesai -->
      <div
        class="relative bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition-all duration-300"
      >
        <div class="absolute top-4 right-4 text-4xl opacity-20">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3 class="text-lg font-semibold mb-2">Selesai</h3>
        <p class="text-2xl font-bold">{{ tasks.completed.length }}</p>
      </div>
    </div>

    <!-- Tabel Task -->
    <div class="bg-white shadow-lg rounded-xl p-6">
      <h3 class="text-lg font-semibold mb-4">List Task</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 rounded-lg">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul Task</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Dibuat</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-100">
            <tr
              v-for="(task, index) in allTasks"
              :key="task.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ task.title }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-yellow-100 text-yellow-800': task.status === 'pending',
                    'bg-purple-100 text-purple-800': task.status === 'in_progress',
                    'bg-green-100 text-green-800': task.status === 'completed'
                  }"
                >
                  {{ task.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(task.created_at) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(task.deadline) }}</td>
            </tr>
            <tr v-if="allTasks.length === 0">
              <td colspan="6" class="text-center py-4 text-gray-400">Tidak ada task</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tasks: {
        pending: [],
        in_progress: [],
        completed: []
      }
    };
  },
  computed: {
    totalTasks() {
      return this.tasks.pending.length + this.tasks.in_progress.length + this.tasks.completed.length;
    },
    allTasks() {
      return [...this.tasks.pending, ...this.tasks.in_progress, ...this.tasks.completed];
    }
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/tasks/by-status", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          this.tasks.pending = response.data.data.pending;
          this.tasks.in_progress = response.data.data.in_progress;
          this.tasks.completed = response.data.data.completed;
        }
      } catch (error) {
        console.error("Gagal ambil tasks:", error);
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return "-";
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    }
  }
};
</script>

<style scoped>
.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>
