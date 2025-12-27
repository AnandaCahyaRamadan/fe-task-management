<template>
  <main class="flex-1 p-6 overflow-auto bg-gray-100">
    <!-- Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div
        class="relative bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition-all duration-300"
      >
        <div class="absolute top-4 right-4 text-4xl opacity-20">
          <i class="fas fa-tasks"></i>
        </div>
        <h3 class="text-lg font-semibold mb-2">Total Task</h3>
        <p class="text-2xl font-bold">{{ totalTasks }}</p>
      </div>

      <div
        class="relative bg-gradient-to-r from-yellow-400 to-yellow-300 text-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition-all duration-300"
      >
        <div class="absolute top-4 right-4 text-4xl opacity-20">
          <i class="fas fa-clock"></i>
        </div>
        <h3 class="text-lg font-semibold mb-2">Pending</h3>
        <p class="text-2xl font-bold">{{ tasks.pending.length }}</p>
      </div>

      <div
        class="relative bg-gradient-to-r from-purple-500 to-purple-400 text-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition-all duration-300"
      >
        <div class="absolute top-4 right-4 text-4xl opacity-20">
          <i class="fas fa-spinner"></i>
        </div>
        <h3 class="text-lg font-semibold mb-2">In Progress</h3>
        <p class="text-2xl font-bold">{{ tasks.in_progress.length }}</p>
      </div>

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

    <!-- Charts -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div class="bg-white shadow-lg rounded-xl p-6">
        <h3 class="text-lg font-semibold mb-4">Statistik Status Task</h3>
        <canvas id="statusChart"></canvas>
      </div>

      <div class="bg-white shadow-lg rounded-xl p-6">
        <h3 class="text-lg font-semibold mb-4">Task per Hari</h3>
        <canvas id="dailyChart"></canvas>
      </div>
    </div>

    <!-- DataTable -->
    <div class="bg-white shadow-lg rounded-xl p-6">
      <h3 class="text-lg font-semibold mb-4">List Task</h3>
      <div class="overflow-x-auto">
        <div class="min-w-[700px]"><!-- minimal width agar scroll muncul jika layar kecil -->
          <VueGoodTable
            :columns="columns"
            :rows="allTasks"
            :search-options="{ enabled: true }"
            :pagination-options="{ enabled: true, perPage: 5 }"
          >
            <template #table-row="{ column, row }">
              <span v-if="column.field === 'status'"
                    :class="{
                      'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full': row.status === 'pending',
                      'bg-purple-100 text-purple-800 px-2 py-1 rounded-full': row.status === 'in_progress',
                      'bg-green-100 text-green-800 px-2 py-1 rounded-full': row.status === 'completed'
                    }">
                {{ row.status }}
              </span>
              <span v-else-if="column.field === 'created_at'">{{ formatDate(row.created_at) }}</span>
              <span v-else-if="column.field === 'deadline'" 
                    :class="{
                      'bg-red-100 text-red-800 px-2 py-1 rounded-full': new Date(row.deadline) < new Date()
                    }">
                {{ formatDate(row.deadline) }}
              </span>
              <span v-else-if="column.field === 'assigned_user'">{{ row.assigned_user_name }}</span>
              <span v-else>{{ row[column.field] }}</span>
            </template>
          </VueGoodTable>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { VueGoodTable } from "vue-good-table-next";
import "vue-good-table-next/dist/vue-good-table-next.css";
import axios from "axios";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  components: { VueGoodTable },
  data() {
    return {
      tasks: { pending: [], in_progress: [], completed: [] },
      columns: [
        { label: "No", field: "index", sortable: false },
        { label: "Judul Task", field: "title", sortable: true },
        { label: "Status", field: "status", sortable: true },
        { label: "Assigned User", field: "assigned_user", sortable: true },
        { label: "Tanggal Dibuat", field: "created_at", sortable: true },
        { label: "Deadline", field: "deadline", sortable: true },
      ],
    };
  },
  computed: {
    totalTasks() {
      return this.tasks.pending.length + this.tasks.in_progress.length + this.tasks.completed.length;
    },
    allTasks() {
      return [...this.tasks.pending, ...this.tasks.in_progress, ...this.tasks.completed].map((task, i) => ({
        ...task,
        index: i + 1,
        assigned_user_name: task.assigned_user ? task.assigned_user.name : "-",
      }));
    },
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
          this.tasks.pending = response.data.data.pending || [];
          this.tasks.in_progress = response.data.data.in_progress || [];
          this.tasks.completed = response.data.data.completed || [];
        }
          this.renderStatusChart();
          this.renderDailyChart();          
      } catch (error) {
        console.error("Gagal ambil tasks:", error);
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return "-";
      const date = new Date(dateStr);
      const day = String(date.getDate()).padStart(2, "0");
      const month = date.toLocaleString("id-ID", { month: "long" });
      const year = date.getFullYear();
      const hour = String(date.getHours()).padStart(2, "0");
      const minute = String(date.getMinutes()).padStart(2, "0");
      return `${day} ${month} ${year}, ${hour}:${minute}`;
    },
    renderStatusChart() {
      const ctx = document.getElementById("statusChart");

      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Pending", "In Progress", "Completed"],
          datasets: [{
            data: [
              this.tasks.pending.length,
              this.tasks.in_progress.length,
              this.tasks.completed.length
            ],
            backgroundColor: ["#facc15", "#a855f7", "#22c55e"]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "bottom" }
          }
        }
      });
    },

    renderDailyChart() {
      const allTasks = [
        ...this.tasks.pending,
        ...this.tasks.in_progress,
        ...this.tasks.completed
      ];

      const grouped = {};
      allTasks.forEach(task => {
        const date = new Date(task.created_at).toLocaleDateString("id-ID");
        grouped[date] = (grouped[date] || 0) + 1;
      });

      const ctx = document.getElementById("dailyChart");

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(grouped),
          datasets: [{
            label: "Jumlah Task",
            data: Object.values(grouped),
            backgroundColor: "#3b82f6"
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>
