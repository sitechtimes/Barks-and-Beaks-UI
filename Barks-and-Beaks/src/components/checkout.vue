<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50 w-full h-full"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div
      class="flex flex-col overflow-scroll checkout-container p-4 bg-white shadow-md w-full z-50 h-full"
    >
      <div class="flex flex-row justify-between text-center items-center mb-4">
        <h1 class="text-2xl font-bold">Checkout</h1>
        <button
          class="border-2 border-black transition-all duration-125 hover:bg-base-300 active:scale-90 ease-in-out bg-base-200 rounded-full w-10 h-10 flex items-center justify-center text-black"
          @click="closeCheckout"
        >
          <img src="../assets/close.svg" alt="cart" class="w-8 h-8" />
        </button>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            type="text"
            id="name"
            v-model="name"
            required
            class="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            <div
              v-if="Object.keys(item.selectedModifiers).length > 0"
              class="text-sm"
            >
              <div v-for="(value, key) in item.selectedModifiers" :key="key">
                <p v-if="Array.isArray(value)">
                  {{ key }}:
                  <span v-for="(val, index) in value" :key="index"
                    >{{ val
                    }}<span v-if="index < value.length - 1">, </span></span
                  >
                </p>
                <p v-else>{{ key }}: {{ value }}</p>
              </div>
            </div>
            <div class="flex flex-row items-center w-full mt-2">
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
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Total</h2>
          <p class="text-lg font-semibold">{{ global.totalPrice }}$</p>
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

const emit = defineEmits(["close"]);

const global = useGlobalStore();

const name = ref("");

const handleSubmit = () => {
  if (Object.keys(global.cart).length === 0) {
    alert("Your cart is empty.");
    return;
  }
};

const decreaseQuantity = (key) => {
  global.decreaseQuantity(key, 1);
};

const increaseQuantity = (key) => {
  global.increaseQuantity(key, 1);
};

let startY = 0;
const handleTouchStart = (event) => {
  startY = event.touches[0].clientY;
};

const handleTouchMove = (event) => {
  const currentY = event.touches[0].clientY;
  const diffY = currentY - startY;

  if (diffY > 25 && startY < 80) {
    closeCheckout();
  }
};

const handleTouchEnd = () => {
  startY = 0;
};

const closeCheckout = () => {
  emit("close");
};
</script>
