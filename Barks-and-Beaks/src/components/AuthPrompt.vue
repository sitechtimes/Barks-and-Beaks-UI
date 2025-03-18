<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-4">Enter Authorization Code</h2>
      <input
        type="text"
        v-model="code"
        maxlength="5"
        class="border p-2 rounded w-full mb-4"
        placeholder="Enter 5-digit code"
      />
      <button
        @click="checkCode"
        class="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useGlobalStore } from "@/stores/global";

const store = useGlobalStore();
const code = ref("");
const error = ref("");

const checkCode = () => {
  let login = store.loginSite(code.value);
  if (login) {
    localStorage.setItem("authorized", "true");
    window.location.reload();
  } else {
    error.value = "Invalid code";
  }
};
</script>
