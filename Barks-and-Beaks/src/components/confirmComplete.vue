<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-xl font-semibold mb-4">Confirm Completion</h2>
      <p class="mb-4">Are you sure you want to complete this order?</p>
      <div class="flex justify-end space-x-4">
        <button
          @click="$emit('confirm')"
          class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Yes
        </button>
        <button
          @click="$emit('cancel')"
          class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const show = ref(true);
</script>
