import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    loggedIn: false,
    cart: {},
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
    addToCart(product, quantity) {
      if (this.cart[product.name]) {
        this.cart[product.name].quantity += quantity;
      } else {
        this.cart[product.name] = { ...product, quantity };
      }
    },
  },
});
