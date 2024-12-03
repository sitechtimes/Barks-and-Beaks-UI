import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    loggedIn: false,
  }),
  actions: {},
});
