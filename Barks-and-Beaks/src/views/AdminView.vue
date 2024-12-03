<template>
  <div v-if="store.loggedIn">
    <h1 class="text-4xl font-bold">Admin</h1>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useGlobalStore } from "@/stores/global";

const store = useGlobalStore();
</script>
