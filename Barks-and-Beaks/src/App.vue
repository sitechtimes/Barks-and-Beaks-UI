<script setup>
import { ref } from "vue";
import { RouterView, useRoute } from "vue-router";
import AuthPrompt from "@/components/AuthPrompt.vue";

const route = useRoute();
const isAuthorized = ref(localStorage.getItem("authorized") === "true");
</script>

<template>
  <main class="flex flex-col h-screen relative">
    <AuthPrompt v-if="!isAuthorized" />
    <header class="flex items-center max-h-screen">
      <button
        class="fixed left-2 top-2 transition bg-gray-700 duration-125 hover:bg-base-300 active:scale-90 ease-in-out bottom-1 right-1 rounded-full w-10 h-10 flex items-center justify-center text-black z-10"
        v-if="$route.path !== '/'"
        @click="$router.push('/')"
      >
        <img src="./assets/home.svg" alt="Home" class="w-6 h-6 invert" />
      </button>
    </header>
    <RouterView v-if="isAuthorized" />
  </main>
</template>
