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
      <div
        class="flex flex-row justify-between text-center items-center mb-4"
        @click.self="closeCheckout"
      >
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
            v-model="global.name"
            required
            class="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <h3 class="text-md font-semibold">Pickup or Delivery</h3>
          <div class="flex space-x-4 mt-2">
            <button
              type="button"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-all w-1/2"
              :class="
                global.pickupOption === 'Pickup'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              "
              @click="global.pickupOption = 'Pickup'"
            >
              Pickup
            </button>
            <button
              type="button"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-all w-1/2"
              :class="
                global.pickupOption === 'Delivery'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              "
              @click="global.pickupOption = 'Delivery'"
            >
              Delivery
            </button>
          </div>
          <input
            v-if="global.pickupOption === 'Delivery'"
            type="text"
            v-model="global.roomNumber"
            placeholder="Enter your room number"
            class="w-full mt-2 p-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="note" class="block text-sm font-medium text-gray-700"
            >Note</label
          >
          <textarea
            id="note"
            v-model="global.note"
            placeholder="Add a note for your order"
            class="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <div class="mb-4">
          <label for="readyTime" class="block text-sm font-medium text-gray-700"
            >When will the order be ready?</label
          >
          <select
            id="readyTime"
            v-model="global.readyTime"
            class="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="When ready">When ready</option>
            <option value="Tomorrow 08:00">Tomorrow 08:00</option>
            <option value="Tomorrow 08:15">Tomorrow 08:15</option>
            <option value="Tomorrow 08:30">Tomorrow 08:30</option>
            <option value="Tomorrow 08:45">Tomorrow 08:45</option>
            <option value="Tomorrow 09:00">Tomorrow 09:00</option>
            <option value="Tomorrow 09:15">Tomorrow 09:15</option>
            <option value="Tomorrow 09:30">Tomorrow 09:30</option>
          </select>
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
        <div class="flex justify-between gap-3 items-center mb-4">
          <button
            type="submit"
            class="w-4/5 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Place Order
          </button>
          <button
            type="button"
            class="w-1/5 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
            @click="clearCart"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useGlobalStore } from "@/stores/global";

const emit = defineEmits(["close"]);

const global = useGlobalStore();

const handleSubmit = () => {
  if (Object.keys(global.cart).length === 0) {
    alert("Your cart is empty.");
    return;
  }
  if (global.pickupOption === "Delivery" && !global.roomNumber) {
    alert("Please enter a room number for delivery.");
    return;
  }
  let order = global.placeOrder(
    global.name,
    global.cart,
    global.totalPrice,
    global.note,
    global.pickupOption,
    global.roomNumber,
    global.readyTime
  );
  if (!order) {
    alert("Something went wrong. Please try again.");
    return;
  } else {
    alert(`Order placed for ${global.name}.`);
    global.clearCart();
  }
};

const clearCart = () => {
  global.clearCart();
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
