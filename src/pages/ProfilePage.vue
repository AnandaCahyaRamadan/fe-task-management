<template>
  <main class="flex-1 p-6 overflow-auto">
    <h3 class="text-xl font-semibold mb-4">Profil Saya</h3>
    <p>Nama: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
  </main>
</template>

<script>
export default {
  data() {
    return { user: JSON.parse(localStorage.getItem("user")) || {} };
  }
};
</script>
