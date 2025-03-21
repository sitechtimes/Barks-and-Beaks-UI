import { defineStore } from "pinia";
import supabase from "../config/supabase.js";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    loggedIn: false,
    cart: JSON.parse(localStorage.getItem("cart")) || {},
    totalPrice: parseFloat(localStorage.getItem("totalPrice")) || 0,
    orders: {},
    note: localStorage.getItem("note") || "",
    name: localStorage.getItem("name") || "",
    pickupOption: localStorage.getItem("pickupOption") || "Pickup",
    roomNumber: localStorage.getItem("roomNumber") || "",
    readyTime: localStorage.getItem("readyTime") || "When ready",
    checkout: false,
    stats: {},
  }),
  actions: {
    async loadStats() {
      let { data: stats, error } = await supabase.from("stats").select("*");
      if (stats) {
        this.stats = stats;
        supabase
          .channel("custom-all-channel")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "stats" },
            (payload) => {
              //console.log(payload);
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
    async restoreItem(
      name,
      items,
      price,
      note,
      pickupOption,
      roomNumber,
      readyTime,
      id
    ) {
      const orderData = {
        name: name,
        items: items,
        price: price,
        note: note,
        pickup: pickupOption,
        room: roomNumber,
        readyTime: readyTime,
      };
      const { data, insertError } = await supabase
        .from("CurrentOrders")
        .insert([orderData])
        .select();
      if (insertError) {
        console.error("Error inserting order into CurrentOrders:", insertError);
        return false;
      }
      return true;
    },

    async uploadStats(
      name,
      items,
      price,
      note,
      pickupOption,
      roomNumber,
      readyTime
    ) {
      const itemArray = Object.values(items);
      const formattedItems = itemArray.map((item) => [
        item.name,
        item.quantity,
        item.selectedModifiers || {},
      ]);
      const formattedData = itemArray.map((item) => ({
        name: item.name,
        modifiers: item.selectedModifiers || {},
      }));

      const orderData = {
        name: name,
        items: formattedItems,
        price: price,
        note: note,
        pickup: pickupOption,
        room: roomNumber,
        readyTime: readyTime,
      };

      const { data, error } = await supabase
        .from("stats")
        .insert([orderData])
        .select();

      if (error) {
        console.error("Error inserting order:", error);
        return false;
      } else {
        this.clearCart();
        return true;
      }
    },
    saveToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
      localStorage.setItem("totalPrice", this.totalPrice.toString());
      localStorage.setItem("note", this.note);
      localStorage.setItem("name", this.name);
      localStorage.setItem("pickupOption", this.pickupOption);
      localStorage.setItem("roomNumber", this.roomNumber);
      localStorage.setItem("readyTime", this.readyTime);
    },
    clearCart() {
      this.cart = {};
      this.totalPrice = 0;
      this.note = "";
      this.name = "";
      this.pickupOption = "Pickup";
      this.roomNumber = "";
      this.readyTime = "When ready";
      this.saveToLocalStorage();
    },
    async placeOrder(
      name,
      items,
      price,
      note,
      pickupOption,
      roomNumber,
      readyTime
    ) {
      const itemArray = Object.values(items);
      const formattedItems = itemArray.map((item) => [
        item.name,
        item.quantity,
        item.selectedModifiers || {},
      ]);
      const formattedData = itemArray.map((item) => ({
        name: item.name,
        modifiers: item.selectedModifiers || {},
      }));

      const orderData = {
        name: name,
        items: formattedItems,
        price: price,
        note: note,
        pickup: pickupOption,
        room: roomNumber,
        readyTime: readyTime,
      };

      const { data, error } = await supabase
        .from("CurrentOrders")
        .insert([orderData])
        .select();

      if (error) {
        console.error("Error inserting order:", error);
        return false;
      } else {
        this.clearCart();
        return true;
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
              //console.log(payload);
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
    async completeOrder(orderId) {
      const { data, error } = await supabase
        .from("CurrentOrders")
        .delete()
        .eq("id", orderId);

      if (error) {
        console.error("Error completing order:", error);
        return false;
      } else {
        this.orders = this.orders.filter((order) => order.id !== orderId);
        return true;
      }
    },
    async login(username, password) {
      let { data: logins, error } = await supabase.from("logins").select("*");
      if (error) {
        console.error("Error fetching logins:", error);
        return false;
      }
      const user = logins.find(
        (login) => login.adminUser === username && login.adminPass === password
      );
      if (user) {
        this.loggedIn = true;
        return true;
      } else {
        return false;
      }
    },
    async loginSite(code) {
      let { data: logins, error } = await supabase.from("logins").select("*");
      if (error) {
        console.error("Error fetching logins:", error);
        return false;
      }
      const user = logins.find((login) => login.siteLogin === code);
      if (user) {
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
      this.updateTotalPrice();
      this.saveToLocalStorage();
    },
    increaseQuantity(uniqueKey, quantity = 1) {
      if (this.cart[uniqueKey]) {
        this.cart[uniqueKey].quantity += quantity;
        this.updateTotalPrice();
        this.saveToLocalStorage();
      }
    },
    decreaseQuantity(uniqueKey, quantity = 1) {
      if (this.cart[uniqueKey]) {
        this.cart[uniqueKey].quantity -= quantity;
        if (this.cart[uniqueKey].quantity <= 0) {
          delete this.cart[uniqueKey];
        }
        this.updateTotalPrice();
        this.saveToLocalStorage();
      }
    },
    updateTotalPrice() {
      this.totalPrice = Object.values(this.cart).reduce(
        (total, item) => total + item.options.price * item.quantity,
        0
      );
    },
  },
});
