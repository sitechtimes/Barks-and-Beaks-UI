<template>
  <div
    class="relative max-w-lg mx-auto bg-gray-200 rounded-md shadow-md flex p-2 m-5 justify-between"
    v-for="item in props.items"
    :key="item"
  >
    <!-- item image -->
    <div class="w-1/2 h-full rounded-md overflow-hidden">
      <img
        :src="item.image"
        :alt="item.name"
        class="object-cover w-full h-full"
      />
    </div>

    <!-- item content -->
    <div class="flex-1 px-4 space-y-1">
      <h2 class="text-2xl font-bold my-2">{{ item.name }}</h2>
      <!-- <p class="text-md text-ellipsis line-clamp-1">{{ item.description }}</p> -->
      <p class="text-lg font-semibold">
        ${{ parseFloat(item.options.price).toFixed(2) }}
      </p>
    </div>

    <!-- add to cart button -->
    <button
      @click="$router.push('/' + item.name)"
      class="absolute bottom-2 right-2 w-10 h-10 bg-[#859faf] rounded-full flex items-center justify-center shadow-md"
    >
      <img src="/shopping-bag-add.png" alt="Add to Cart" class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup>
import router from "@/router";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>
