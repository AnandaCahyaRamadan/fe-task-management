<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Register</h2>

      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block font-semibold mb-1">Name</label>
          <input
            type="text"
            v-model="name"
            class="w-full border px-3 py-2 rounded focus:outline-none"
          />
        </div>

        <div class="mb-4">
          <label class="block font-semibold mb-1">Email</label>
          <input
            type="email"
            v-model="email"
            class="w-full border px-3 py-2 rounded focus:outline-none"
          />
        </div>

        <div class="mb-4">
          <label class="block font-semibold mb-1">Password</label>
          <input
            type="password"
            v-model="password"
            class="w-full border px-3 py-2 rounded focus:outline-none"
          />
        </div>

        <button
          class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Register
        </button>

        <p class="text-center mt-4">
          Sudah punya akun?
          <router-link class="text-blue-600" to="/login">Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },

  methods: {
    register() {
      console.log("Name:", this.name);
      console.log("Email:", this.email);
      console.log("Password:", this.password);

      // Contoh axios
      // axios.post('/register', {
      //   name: this.name,
      //   email: this.email,
      //   password: this.password
      // })
    },
  },
};
</script>
