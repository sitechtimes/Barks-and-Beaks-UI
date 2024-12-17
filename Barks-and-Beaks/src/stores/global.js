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
      const modifiersKey = JSON.stringify(product.selectedModifiers);
      const uniqueKey = `${product.name}-${modifiersKey}`;

      if (this.cart[uniqueKey]) {
        this.cart[uniqueKey].quantity += quantity;
      } else {
        this.cart[uniqueKey] = { ...product, quantity };
      }
    },
    increaseQuantity(uniqueKey, quantity = 1) {
      if (this.cart[uniqueKey]) {
        this.cart[uniqueKey].quantity += quantity;
      }
    },
    decreaseQuantity(uniqueKey, quantity = 1) {
      if (this.cart[uniqueKey]) {
        this.cart[uniqueKey].quantity -= quantity;
        if (this.cart[uniqueKey].quantity <= 0) {
          delete this.cart[uniqueKey];
        }
      }
    },
  },
});
