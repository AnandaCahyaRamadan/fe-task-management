<template>
  <header class="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
    <h2 class="text-xl font-semibold text-gray-700">{{ title }}</h2>
    <div class="text-gray-600">
      Halo, <span class="font-medium">{{ user.name }}</span>
    </div>
  </header>
</template>

<script>
    export default {
    name: "HeaderComponent",
    props: {
        user: Object,
        title: {
        type: String,
        default: "Dashboard"
        }
    }
    };
</script>
