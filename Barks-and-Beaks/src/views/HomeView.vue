<template>
  <div class="flex flex-col items-center mx-6">
    <div
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
          <label tabindex="0" class="btn m-1 w-full font-josefin">Order Filter</label>
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
    <h1 class="text-3xl font-semibold text-center my-3 font-mono">
      What can we get you started with?
    </h1>
    <h1
      class="text-2xl font-semibold text-center my-3  underline"
      v-if="featured.length > 0"
    >
      Featured
    </h1>
    <div class="grid grid-cols-2 w-full md:grid-cols-3 lg:grid-cols-4 gap-4">
      <itemCard :items="featured" />
    </div>
    <h1
      class="text-2xl font-semibold text-center my-3  underline mt-5"
      v-if="drinks.length > 0"
    >
      Drinks
    </h1>
    <div class="grid grid-cols-2 w-full md:grid-cols-3 lg:grid-cols-4 gap-4">
      <itemCard :items="drinks" />
    </div>
    <h1
      class="text-2xl font-semibold text-center my-3  underline"
      v-if="bakery.length > 0"
    >
      Bakery
    </h1>
    <div class="grid grid-cols-2 w-full md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
      <itemCard :items="bakery" />
    </div>
  </div>
</template>

<script setup>
import data from "../assets/data.json";
import { ref, computed } from "vue";
import itemCard from "@/components/itemCard.vue";

const selectedCategories = ref([]);

const search = ref("");

const drinks = computed(() =>
  data
    .filter(
      (item) =>
        (selectedCategories.value.length === 0 ||
          selectedCategories.value.includes(item.options.category)) &&
        item.name.toLowerCase().includes(search.value.toLowerCase())
    )
    .filter((item) => item.options.type === "Drink")
);

const featured = computed(() =>
  data
    .filter(
      (item) =>
        (selectedCategories.value.length === 0 ||
          selectedCategories.value.includes(item.options.category)) &&
        item.name.toLowerCase().includes(search.value.toLowerCase())
    )
    .filter((item) => item.options.type === "Featured")
);

const bakery = computed(() =>
  data
    .filter(
      (item) =>
        (selectedCategories.value.length === 0 ||
          selectedCategories.value.includes(item.options.category)) &&
        item.name.toLowerCase().includes(search.value.toLowerCase())
    )
    .filter((item) => item.options.type === "Bakery")
);
</script>

