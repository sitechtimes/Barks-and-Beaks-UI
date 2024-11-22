<template>
  <div
    class="flex flex-col md:flex-row lg:items-center p-5 gap-2 md:gap-5 w-full"
  >
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
        <label tabindex="0" class="btn m-1 w-full">Drink Filter</label>
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
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

  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div
      class="card flex items-center justify-center p-3 shadow-lg h-max min-h-80 w-full"
      v-for="drink in filteredDrinks"
      :key="drink"
    >
      <div class="avatar">
        <div class="w-32 rounded-full">
          <img src="https://placekitten.com/200/300" alt="Kitten" />
        </div>
      </div>
      <h1 class="text-3xl font-semibold text-center">
        {{ drink.name }}
      </h1>
      <p class="text-3xl font-bold text-center">${{ drink.Price }}</p>
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
        selectedCategories.value.includes(drink.Category)) &&
      drink.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
</script>
