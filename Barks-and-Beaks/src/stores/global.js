import { defineStore } from "pinia";
import supabase from "../config/supabase.js";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    loggedIn: false,
    cart: {},
    totalPrice: 0,
    orders: {},
  }),
  actions: {
    async placeOrder(name, items, price) {
      const itemArray = Object.values(items);

      const formattedItems = itemArray.map((item) => ({
        name: item.name,
        quantity: item.quantity,
      }));

      const formattedModifiers = itemArray.map((item) => ({
        name: item.name,
        modifiers: item.selectedModifiers,
      }));

      const orderData = {
        name: name,
        items: formattedItems,
        modifiers: formattedModifiers,
        price: price,
      };

      const { data, error } = await supabase
        .from("CurrentOrders")
        .insert([orderData])
        .select();

      if (error) {
        console.error("Error placing order:", error);
      } else {
        console.log("Order placed!", data);
      }
    },
    async loadOrders() {
      let { data: CurrentOrders, error } = await supabase
        .from("CurrentOrders")
        .select("*");
      if (CurrentOrders) {
        this.orders = CurrentOrders;
        supabase
          .channel("custom-all-channel")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "CurrentOrders" },
            (payload) => {
              console.log("Change received!", payload);
              if (payload.eventType === "INSERT") {
                this.orders.push(payload.new);
              } else if (payload.eventType === "UPDATE") {
                const index = this.orders.findIndex(
                  (order) => order.id === payload.new.id
                );
                this.orders[index] = payload.new;
              } else if (payload.eventType === "DELETE") {
                this.orders = this.orders.filter(
                  (order) => order.id !== payload.old.id
                );
              }
            }
          )
          .subscribe();
      }
    },
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
      this.totalPrice += this.cart[uniqueKey].options.price;
    },
    decreaseQuantity(uniqueKey, quantity = 1) {
      this.totalPrice -= this.cart[uniqueKey].options.price;
      if (this.cart[uniqueKey]) {
        this.cart[uniqueKey].quantity -= quantity;
        if (this.cart[uniqueKey].quantity <= 0) {
          delete this.cart[uniqueKey];
        }
      }
    },
  },
});
