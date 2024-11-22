<template>
  <div class="flex flex-col items-center">    <div
    class="flex flex-col items-center md:flex-row p-5 gap-2 md:gap-5 w-full"
  >
    <!-- Make some kind of dinsguisher that this is the drinks section-->
    <label class="input input-bordered flex items-center gap-2 w-full md:4/5">
      <input
        id="search"
        type="text"
        class="grow"
        placeholder="Search"
        v-model="search"
      />
      <label for="search" class="sr-only">Search</label>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        class="h-4 w-4 opacity-70"
      >
        <path
          fill-rule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clip-rule="evenodd"
        />
      </svg>
    </label>
    <div class="w-full md:w-1/5 flex items-center justify-center z-[1]">
      <div class="dropdown w-full">
        <label tabindex="0" class="btn m-1 w-full">Order Filter</label>
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
        <li><h2 class="font-bold">Drinks</h2></li>
          <li>
            <label class="flex items-center">
              <input
                type="checkbox"
                class="checkbox"
                v-model="selectedCategories"
                value="Coffee"
              />
              <span class="label-text">Coffee</span>
            </label>
          </li>
          <li>
            <label class="flex items-center">
              <input
                type="checkbox"
                class="checkbox"
                v-model="selectedCategories"
                value="Juice"
              />
              <span class="label-text">Juice</span>
            </label>
          </li>
          <li>
            <label class="flex items-center">
              <input
                type="checkbox"
                class="checkbox"
                v-model="selectedCategories"
                value="Smoothie"
              />
              <span class="label-text">Smoothie</span>
            </label>
          </li>
          <li>
            <label class="flex items-center">
              <input
                type="checkbox"
                class="checkbox"
                v-model="selectedCategories"
                value="Tea"
              />
              <span class="label-text">Tea</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <h1 class="text-3xl font-semibold text-center my-3 font-mono">What can we get you started with?</h1>

  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div
      class="card flex items-center justify-center p-3 shadow-lg h-max min-h-80 w-full"
      v-for="drink in filteredDrinks"
      :key="drink"
    >
      <div class="avatar">
        <div class="w-32 rounded-full">
          <img src="data:image/jpeg;base64,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" alt="Kitten" />
        </div>
      </div>
      <h1 class="text-3xl font-semibold text-center">
        {{ drink.name }}
      </h1>
      <p class="text-3xl font-bold text-center">${{ parseFloat(drink.options.price).toFixed(2) }}</p>
    </div>
  </div>
  </div>
</template>

<script setup>
import data from "../assets/data.json";
import { ref, computed } from "vue";

const selectedCategories = ref([]);

const search = ref("");

const filteredDrinks = computed(() =>
  data.filter(
    (drink) =>
      (selectedCategories.value.length === 0 ||
        selectedCategories.value.includes(drink.options.category)) &&
      drink.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
</script>
