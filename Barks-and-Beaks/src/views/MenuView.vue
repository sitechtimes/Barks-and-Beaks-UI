<template>
  <div
    class="flex flex-col items-center md:h-auto h-fit p-4 md:max-w-full max-w-lg md:mx-0 mx-auto pb-32"
  >
    <img
      :src="item.image"
      :alt="item.name"
      class="w-full h-56 md:h-2/5 object-cover rounded-lg shadow-md"
    />

    <h2 class="text-2xl font-bold mt-2 text-center">{{ item.name }}</h2>
    <p class="text-lg font-semibold text-gray-700">
      ${{ parseFloat(item.options.price).toFixed(2) }}
    </p>

    <p class="text-sm text-gray-600 mt-2 text-center px-2">
      {{ item.description }}
    </p>

    <div class="w-full mt-3">
      <div
        v-for="(modifier, modifierName) in item.modifiers"
        :key="modifierName"
        class="border border-gray-300 rounded-lg p-3 bg-white shadow-sm mb-2"
      >
        <h3 class="text-md font-semibold">{{ modifierName }}</h3>
        <ul class="mt-2 space-y-1">
          <li
            v-for="option in modifier.choices"
            :key="option"
            class="flex items-center space-x-2"
          >
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-if="modifier.limit === 1"
                type="radio"
                :name="modifierName"
                v-model="selectedModifiers[modifierName]"
                :value="option"
                class="cursor-pointer"
              />
              <input
                v-else
                type="checkbox"
                v-model="selectedModifiers[modifierName]"
                :value="option"
                class="cursor-pointer"
              />
              <span class="text-sm cursor-pointer">{{ option }}</span>
            </label>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="fixed bottom-0 left-0 w-full bg-white p-3 shadow-md flex justify-center space-x-4"
    >
      <button
        class="bg-primary text-white px-6 py-3 rounded-lg text-lg font-bold w-3/5 transform transition-transform duration-150 active:scale-90"
        @click="addToCart"
      >
        Add to Cart
      </button>
      <div
        class="flex items-center space-x-2 w-2/5 justify-center bg-gray-100 rounded-lg"
      >
        <button
          class="bg-gray-300 text-gray-700 w-10 h-10 rounded-full text-lg font-bold flex items-center justify-center transform transition-transform duration-150 active:scale-90"
          @click="decreaseQuantity"
        >
          -
        </button>
        <span class="text-lg font-semibold">{{ quantity }}</span>
        <button
          class="bg-gray-300 text-gray-700 w-10 h-10 rounded-full text-lg font-bold flex items-center justify-center transform transition-transform duration-150 active:scale-90"
          @click="increaseQuantity"
        >
          +
        </button>
      </div>
    </div>
    <transition
      enter-active-class="animate-expandFromCenter"
      leave-active-class="animate-contractToCenter"
    >
      <div v-if="added" class="fixed top-3 bg-white p-2 rounded-lg shadow-lg">
        <p class="text-success font-bold">Added to cart!</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import data from "../assets/data.json";
import { useRoute } from "vue-router";
import { useGlobalStore } from "@/stores/global";

const store = useGlobalStore();
const route = useRoute();
const routeName = route.params.id;

const item = data.find((item) => item.name === routeName);
const selectedModifiers = reactive({});
const quantity = ref(1);

for (const modifierName in item.modifiers) {
  const modifier = item.modifiers[modifierName];
  selectedModifiers[modifierName] = modifier.limit === 1 ? "" : [];
}

const checkModifiers = () => {
  for (const modifierName in selectedModifiers) {
    const modifier = item.modifiers[modifierName];
    if (modifier.limit === 1 && !selectedModifiers[modifierName]) return false;
    if (modifier.limit !== 1 && selectedModifiers[modifierName].length === 0)
      return false;
  }
  return true;
};

const addToCart = () => {
  if (!checkModifiers()) {
    alert("Please select all options.");
    return;
  }

  const selectedOptions = { ...selectedModifiers };
  store.addToCart(
    {
      ...item,
      selectedModifiers: selectedOptions,
    },
    quantity.value
  );

  added.value = true;
  setTimeout(() => {
    added.value = false;
  }, 2000);
};

const increaseQuantity = () => {
  quantity.value += 1;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
  }
};
const added = ref(false);
</script>
