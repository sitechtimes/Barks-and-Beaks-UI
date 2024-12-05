<template>
  <div class="p-2">
    <loginCard v-if="!store.loggedIn" class="" />
    <div v-if="store.loggedIn">
      <h1 class="text-4xl font-bold">Admin</h1>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useGlobalStore } from "@/stores/global";
import loginCard from "@/components/loginCard.vue";

const store = useGlobalStore();
</script>
