<template>
    <div
      class="du-card-side bg-base-100 shadow-xl flex m-3 h-64 rounded-md border border-[#859faf]/40"
      v-for="item in props.items"
      :key="item.id"
    >
      <figure class="">
        <img
          :src="item.image"
          :alt="item.name"
          class="h-full w-full object-cover"
        />
      </figure>
      <div class="du-card-body w-2/3 p-4">
        <h2 class="du-card-title text-xl font-bold">{{ item.name }}</h2>
        <p class="text-gray-600 line-clamp-2 truncate-clip">{{ item.description }}</p>
        <div class="du-card-actions justify-end">
          <button
            @click="$router.push('/' + item.name)"
            class="btn btn-primary w-full p-2 mt-3 font-bold bg-[#859faf] rounded-md"
          >
            <span class="flex items-center flex-row w-full h-full px-2">
              <p class="text-black">Add to Cart</p>
            </span>
          </button>
        </div>
      </div>
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
