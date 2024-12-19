<template>
  <!-- <div class="flex justify-center bg-gray-100 h-full w-full">
    <div class="card card-body">
      <div class="">
        <img
          :src="item.image"
          :alt="item.name"
          class="w-full object-cover"
        />
        <h2 class="text-4xl font-semibold text-center">
          {{ item.name }}
        </h2>
        <div class="flex flex-row items-center justify-center">
          <p class="text-2xl font-bold text-center">
            ${{ parseFloat(item.options.price).toFixed(2) }}
          </p>
          <p class="text-success ml-3" v-if="added">Added to cart!</p>
        </div>
        <p class="text-2xl text-center mb-5">{{ item.description }}</p>

        <div
          v-for="(modifier, modifierName) in item.modifiers"
          :key="modifierName"
          class="flex flex-col items-start justify-start w-full"
        >
          <h2 class="text-2xl font-bold text-left self-start">
            {{ modifierName }}
          </h2>
          <div
            class="flex flex-row items-center justify-start w-full du-dropdown"
            v-for="option in modifier.choices"
            :key="option"
          >
            <input
              v-if="modifier.limit === 1"
              type="radio"
              :name="modifierName"
              class="radio"
              v-model="selectedModifiers[modifierName]"
              :value="option"
            />
            <input
              v-else
              type="checkbox"
              :name="modifierName"
              class="checkbox"
              v-model="selectedModifiers[modifierName]"
              :value="option"
            />
            <label class="label">
              <span class="label-text ml-2">{{ option }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  <button
            class="ml-5 transition duration-300 hover:bg-base-300 active:scale-90 ease-in-out rounded-md bg-accent text-white w-full h-10 flex items-center justify-center"
            @click="addToCart"
          >
        Add to Cart
          </button> -->
          <div class="flex flex-col items-center h-fit">
  <!-- item image -->
  <img :src="item.image" :alt="item.name" class="w-full h-3/4 object-cover justify-start" />

  <!-- item name and price -->
  <h2 class="text-3xl font-bold mt-4">{{ item.name }}</h2>
  <p class="text-xl font-semibold text-center">
    ${{ parseFloat(item.options.price).toFixed(2) }}
  </p>

  <!-- item description -->
  <div class="mx-4">
    <p class="indent-6 text-left">{{ item.description }}</p>

    <div
      v-for="(modifier, modifierName) in item.modifiers"
      :key="modifierName"
      class="du-collapse du-collapse-arrow border border-base-300 bg-base-100 rounded-box mt-4"
    >
      <input type="checkbox" />
      <div class="du-collapse-title text-xl font-medium">
        {{ modifierName }}
      </div>

      <div class="du-collapse-content">
        <ul class="space-y-2">
          <li
            v-for="option in modifier.choices"
            :key="option"
            class="flex items-center hover:bg-[#859faf]/40 rounded-md transition-all duration-300 py-2"
          >
            <input
              v-if="modifier.limit === 1"
              type="radio"
              :name="modifierName"
              class=""
              v-model="selectedModifiers[modifierName]"
              :value="option"
            />
            <input
              v-else
              type="checkbox"
              :name="modifierName"
              class=""
              v-model="selectedModifiers[modifierName]"
              :value="option"
            />
      <label
              class="label cursor-pointer ml-2 w-full p-2 flex items-center justify-between rounded-md"
              @click="toggleSelection(modifierName, option, modifier.limit)"
            >
              <span class="label-text">{{ option }}</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <button
    class="bg-[#859faf]/40 h-fit w-full rounded-md p-2d"
    @click="addToCart"
  >
    Add to Cart
  </button>
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

for (const modifierName in item.modifiers) {
  const modifier = item.modifiers[modifierName];
  selectedModifiers[modifierName] = modifier.limit === 1 ? "" : [];
}

const checkModifiers = () => {
  for (const modifierName in selectedModifiers) {
    const modifier = item.modifiers[modifierName];
    if (modifier.limit === 1 && !selectedModifiers[modifierName]) {
      return false;
    }
    if (modifier.limit !== 1 && selectedModifiers[modifierName].length === 0) {
      return false;
    }
  }
  return true;
};



const addToCart = () => {
  if (!checkModifiers()) {
    alert("Please select all options.");
    return;
  }
  const selectedOptions = { ...selectedModifiers };
  store.addToCart({ ...item, selectedModifiers: selectedOptions }, 1);
  store.totalPrice += parseFloat(item.options.price);
  console.log(store.cart);
  added.value = true;
};

const added = ref(false);
</script>
