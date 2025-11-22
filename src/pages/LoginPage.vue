<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>

      <form @submit.prevent="login">
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
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p class="text-center mt-4">
          Belum punya akun?
          <router-link class="text-blue-600" to="/register">Daftar</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    login() {
      console.log("Email:", this.email);
      console.log("Password:", this.password);

      // Contoh axios
      // axios.post('/login', { email: this.email, password: this.password })
      //   .then(res => console.log(res.data))
    },
  },
};
</script>
