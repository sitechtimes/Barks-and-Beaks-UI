import { ref } from "vue";
import { defineStore } from "pinia";

export const useGlobal = defineStore("global", () => {
  const loginPage = ref(false);

  function toggleLoginPage() {
    loginPage.value = !loginPage.value;
  }

  return { loginPage, toggleLoginPage };
});
