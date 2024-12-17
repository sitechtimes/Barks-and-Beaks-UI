<template>
  <div
    class="card card-compact flex items-center justify-center p-3 shadow-lg h-auto w-full border border-base-400 border-l-base-300 border-t-base-200 border-r-base-300"
    v-for="item in props.items"
    :key="item"
  >
    <div class="avatar">
      <div class="w-32 rounded-full overflow-hidden">
        <img
          :src="item.image"
          :alt="item.name"
          class="h-full w-full object-cover"
        />
      </div>
    </div>
    <div class="card card-body w-full">
      <div class="card card-title">
        <h1 class="text-2xl font-semibold text-center">
          {{ item.name }}
        </h1>
        <p class="text-xl font-bold text-center">
          ${{ parseFloat(item.options.price).toFixed(2) }}
        </p>
      </div>
      <div class="card card-actions h-full justify-end w-full">
        <button
          @click="$router.push('/' + item.name)"
          class="btn btn-primary w-full mt-3 font-bold"
        >
          <span class="flex items-center flex-row w-full h-full">
            <p>Add to Cart</p>
            <img
              src="../assets/add-to-cart-svgrepo-com.svg"
              alt="add to cart"
              class="w-6 h-6"
            />
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
