<template>
  <div
    class="w-full flex items-center p-9 md:p-9 bg-gradient-to-b from-[#576395] to-[#314596] flex-col md:flex-row justify-center z-0"
  >
    <h1
      class="btn-primary font-bold text-4xl md:text-5xl lg:text-7xl mb-3 md:mb-0 md:mr-10 text-black"
    >
      Barks and Beaks
    </h1>
  </div>
  <div class="flex flex-col items-center mx-6">
    <div
      class="flex flex-row items-center justify-center p-5 gap-2 md:gap-5 w-full"
    >
      <label
        class="border-[#859faf]/40 border-2 rounded-md input input-bordered flex items-center gap-2 w-full md:4/5"
      >
        <input
          id="search"
          type="text"
          class="grow text-xl px-2 w-full bg-transparent m-2"
          placeholder="Search"
          v-model="search"
        />
        <label for="search" class="sr-only">Search</label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="h-6 w-6 opacity-70 m-2"
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
      <h1 class="text-3xl font-semibold text-center my-3">
        What can we get you started with?
      </h1>
      <h1
        class="text-2xl font-semibold text-center my-3 mt-5 justify-center underline"
        v-if="drinks.length > 0"
      >
        DRINKS
      </h1>
      <div class="space-y-5">
        <itemCard :items="drinks" />
      </div>
      <h1
        class="text-2xl font-semibold text-center my-3 mt-5 underline"
        v-if="drinks.length > 0"
      >
        BAKERY
      </h1>
      <div class="">
        <itemCard :items="bakery" />
      </div>
      <h1
        class="text-2xl font-semibold text-center my-3 underline"
        v-if="snacks.length > 0"
      >
        SNACKS
      </h1>
      <div class="">
        <itemCard :items="snacks" />
      </div>
      <h1
        class="text-2xl font-semibold text-center my-3 mt-5 underline"
        v-if="breakfast.length > 0"
      >
        BREAKFAST
      </h1>
      <div class="">
        <itemCard :items="breakfast" />
      </div>
    </div>
    <h1
      class="text-2xl font-semibold text-center my-3"
      v-if="totalSearchItems === 0"
    >
      Sorry, we couldn't find anything for "{{ search }}" :
    </h1>
    <p
      v-if="search.length === 0"
      class="text-2xl font-semibold text-center mt-3 mb-16"
    >
      Are you an Admin?
      <router-link to="/admin" class="text-primary">Click here</router-link>
      to login
    </p>
  </div>
  <!--
  <button
    class="fixed border-2 border-black transition-all duration-125 hover:bg-base-300 active:scale-90 ease-in-out bottom-3 right-3 bg-base-200 rounded-full w-10 h-10 flex items-center justify-center text-black"
    @click="cartOpen = true"
  >
    <img src="../assets/checkout.svg" alt="cart" class="w-8 h-8" />
  </button>
  -->
  <transition
    enter-active-class="animate-slideIn"
    leave-active-class="animate-slideOut"
  >
    <checkout v-if="cartOpen" @close="cartOpen = false" />
  </transition>
  <transition
    enter-active-class="animate-slideIn"
    leave-active-class="animate-slideOut"
  >
    <div
      class="w-full fixed bottom-0 h-14 bg-[#A2BECE] rounded-t-lg flex justify-between md:justify-start md:gap-3 pr-5 pl-5 items-center z-50"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @click="cartOpen = true"
      v-if="!cartOpen"
    >
      <h1 class="text-xl font-bold">YOUR ORDER</h1>
      <button
        class="rounded-full w-10 h-10 flex items-center justify-center text-black"
      >
        <img src="../assets/checkout.svg" alt="cart" class="w-8 h-8" />
      </button>
    </div>
  </transition>
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

const breakfast = computed(() =>
  data
    .filter((item) =>
      item.name.toLowerCase().includes(search.value.toLowerCase())
    )
    .filter((item) => item.options.category === "Breakfast")
);

const totalSearchItems = computed(() => {
  return (
    drinks.value.length +
    snacks.value.length +
    bakery.value.length +
    breakfast.value.length
  );
});
const cartOpen = ref(false);

let startY = 0;
const handleTouchStart = (event) => {
  startY = event.touches[0].clientY;
};

const handleTouchMove = (event) => {
  const currentY = event.touches[0].clientY;
  const diffY = currentY - startY;

  if (diffY < -25 && startY && window.innerHeight - currentY < 100) {
    cartOpen.value = true;
  }
};

const handleTouchEnd = () => {
  startY = 0;
};
</script>
