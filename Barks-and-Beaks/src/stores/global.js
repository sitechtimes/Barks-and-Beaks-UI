import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    loggedIn: false,
  }),
  actions: {
    login(username, password) {
      if (username === "admin" && password === "password") {
        this.loggedIn = true;
        return true;
      } else {
        return false;
      }
    },
  },
});
