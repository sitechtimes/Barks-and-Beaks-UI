<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="fixed inset-0 bg-black opacity-25" @click="closeCheckout"></div>
    <div class="checkout-container p-4 bg-white shadow-md w-full max-w-md z-50">
      <h1 class="text-2xl font-bold mb-4">Checkout</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            type="text"
            id="name"
            v-model="name"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div
          v-for="(item, key) in global.cart"
          :key="key"
          class="flex items-center mb-4"
        >
          <img
            :src="item.image"
            :alt="item.name"
            class="w-20 h-20 object-cover rounded-full border border-gray-300"
          />
          <div class="flex flex-col ml-4 w-full">
            <div class="flex items-center justify-between w-full">
              <h2 class="text-lg font-semibold">{{ item.name }}</h2>
              <p class="text-lg font-semibold">{{ item.options.price }}$</p>
            </div>
            <div class="flex flex-row items-center w-full">
              <p class="text-lg">{{ item.quantity }}</p>
              <div class="flex justify-center w-full mr-28">
                <button
                  @click.prevent="decreaseQuantity(key)"
                  class="px-2 py-1 bg-gray-200 rounded-full w-8 h-8"
                >
                  -
                </button>
                <button
                  @click.prevent="increaseQuantity(key)"
                  class="ml-2 px-2 py-1 bg-gray-200 rounded-full w-8 h-8"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Place Order
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

const name = ref("");
const isOpen = ref(true);

const handleSubmit = () => {
  // Handle form submission
  console.log("Form submitted:", {
    name: name.value,
  });
};

const decreaseQuantity = (key) => {
  global.decreaseQuantity(key, 1);
};

const increaseQuantity = (key) => {
  global.increaseQuantity(key, 1);
};
</script>
