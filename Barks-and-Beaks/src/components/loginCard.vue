<template>
  <div class="card w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-3xl font-bold mb-4 text-center">Login</h1>
    <form class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Username</label>
        <input
          v-model="username"
          type="text"
          placeholder="username"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="password"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      <div>
        <button
          type="submit"
          class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          @click.prevent="attemptLogin"
        >
          Login
        </button>
      </div>
      <div
        v-if="loginSuccessful === false"
        class="mt-3 text-center text-red-600 font-semibold"
      >
        Invalid username or password
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useGlobalStore } from "@/stores/global";

const username = ref("");
const password = ref("");
const loginSuccessful = ref(null);

const store = useGlobalStore();

function attemptLogin() {
  loginSuccessful.value = store.login(username.value, password.value);
}
</script>
