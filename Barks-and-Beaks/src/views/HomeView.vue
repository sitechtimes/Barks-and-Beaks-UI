<template>
  <div
    class="w-full flex items-center p-14 md:p-9 bg-gradient-to-b from-[#576395] to-[#314596] flex-col md:flex-row justify-center z-0"
  >
    <h1
      class="btn-primary font-bold text-4xl md:text-5xl lg:text-7xl mb-3 md:mb-0 md:mr-10"
    >
      Barks and Beaks
    </h1>
  </div>
  <div class="flex flex-col items-center mx-6">
    <div
      class="flex flex-col items-center md:flex-row p-5 gap-2 md:gap-5 w-full"
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
    </div>
    <div class="z-0">
      <h1 class="text-2xl font-bold text-center my-3">
        What can we get you started with?
      </h1>
      <h1
        class="text-2xl font-semibold text-center my-3  mt-5 justify-center"
        v-if="drinks.length > 0"
      >
        Drinks
      </h1>
      <div class=" w-full md:grid-cols-3 gap-4">
        <itemCard :items="drinks" />
      </div>
      <h1
        class="text-2xl font-semibold text-center my-3  mt-5"
        v-if="drinks.length > 0"
      >
        Bakery
      </h1>
      <div class=" w-full md:grid-cols-3 gap-4">
        <itemCard :items="bakery" />
      </div>
      <h1
        class="text-2xl font-semibold text-center my-3 "
        v-if="snacks.length > 0"
      >
        Snacks
      </h1>
      <div class=" w-full md:grid-cols-3 gap-4 mt-5">
        <itemCard :items="snacks" />
      </div>
    </div>
    <h1
      class="text-2xl font-semibold text-center my-3"
      v-if="totalSearchItems === 0"
    >
      Sorry, we couldn't find anything for "{{ search }}" :(
    </h1>
    <p
      v-if="search.length === 0"
      class="text-2xl font-semibold text-center my-3"
    >
      Are you an Admin?
      <router-link to="/admin" class=" text-primary"
        >Click here</router-link
      >
      to login
    </p>
  </div>

  <transition
    enter-active-class="animate-slideIn"
    leave-active-class="animate-slideOut"
  >
    <checkout v-if="cartOpen" @close="cartOpen = false" />
  </transition>
  <button
    class="fixed border-2 border-black transition duration-125 hover:bg-base-300 active:scale-90 ease-in-out bottom-1 right-1 bg-base-200 rounded-full w-10 h-10 flex items-center justify-center text-black"
    @click="cartOpen = !cartOpen"
  >
    <img
      src="../assets/checkout.svg"
      alt="cart"
      class="w-8 h-8"
      v-if="!cartOpen"
    />
    <p class="text-2xl font-bold" v-else>X</p>
  </button>
</template>

<script setup>
import data from "../assets/data.json";
import { ref, computed } from "vue";
import itemCard from "@/components/itemCard.vue";
import checkout from "@/components/checkout.vue";

const search = ref("");

const drinks = computed(() =>
  data
    .filter((item) =>
      item.name.toLowerCase().includes(search.value.toLowerCase())
    )
    .filter((item) => item.options.type === "Drink")
);

const snacks = computed(() =>
  data
    .filter((item) =>
      item.name.toLowerCase().includes(search.value.toLowerCase())
    )
    .filter((item) => item.options.type === "Snack")
);
const bakery = computed(() =>
  data
    .filter((item) =>
      item.name.toLowerCase().includes(search.value.toLowerCase())
    )
    .filter((item) => item.options.type === "Bakery")
);

const totalSearchItems = computed(() => {
  return drinks.value.length + snacks.value.length + bakery.value.length;
});
const cartOpen = ref(false);
</script>
