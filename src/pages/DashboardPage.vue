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
        <p class="text-2xl font-bold">{{ tasks.length }}</p>
      </div>

      <!-- Pending -->
      <div
        class="relative bg-gradient-to-r from-yellow-400 to-yellow-300 text-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition-all duration-300"
      >
        <div class="absolute top-4 right-4 text-4xl opacity-20">
          <i class="fas fa-clock"></i>
        </div>
        <h3 class="text-lg font-semibold mb-2">Pending</h3>
        <p class="text-2xl font-bold">{{ tasks.filter(t => t.status === 'pending').length }}</p>
      </div>

      <!-- In Progress -->
      <div
        class="relative bg-gradient-to-r from-purple-500 to-purple-400 text-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition-all duration-300"
      >
        <div class="absolute top-4 right-4 text-4xl opacity-20">
          <i class="fas fa-spinner"></i>
        </div>
        <h3 class="text-lg font-semibold mb-2">In Progress</h3>
        <p class="text-2xl font-bold">{{ tasks.filter(t => t.status === 'in_progress').length }}</p>
      </div>

      <!-- Selesai -->
      <div
        class="relative bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition-all duration-300"
      >
        <div class="absolute top-4 right-4 text-4xl opacity-20">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3 class="text-lg font-semibold mb-2">Selesai</h3>
        <p class="text-2xl font-bold">{{ tasks.filter(t => t.status === 'completed').length }}</p>
      </div>
    </div>

    <!-- Tabel Task -->
    <div class="bg-white shadow-lg rounded-xl p-6">
      <h3 class="text-lg font-semibold mb-4">Detail Task</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 rounded-lg">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul Task</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Dibuat</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-100">
            <tr
              v-for="(task, index) in tasks"
              :key="task.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ task.title }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ task.description }}</td>
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
              <td class="px-6 py-4 whitespace-nowrap">{{ task.created_at }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button class="text-blue-500 hover:text-blue-700 font-medium">Edit</button>
                <button class="text-red-500 hover:text-red-700 font-medium ml-2">Hapus</button>
              </td>
            </tr>
            <tr v-if="tasks.length === 0">
              <td colspan="6" class="text-center py-4 text-gray-400">Tidak ada task</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        { id: 1, title: "Task A", description: "Deskripsi Task A", status: "pending", created_at: "2025-11-22" },
        { id: 2, title: "Task B", description: "Deskripsi Task B", status: "in_progress", created_at: "2025-11-21" },
        { id: 3, title: "Task C", description: "Deskripsi Task C", status: "completed", created_at: "2025-11-20" },
        { id: 4, title: "Task D", description: "Deskripsi Task D", status: "pending", created_at: "2025-11-19" },
      ]
    };
  }
};
</script>

<style scoped>
/* Hover smooth effect for cards */
.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>
