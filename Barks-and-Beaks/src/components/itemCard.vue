<template>
  <div
    class="card flex items-center justify-center p-3 shadow-lg h-max min-h-80 w-full"
    v-for="item in props.items"
    :key="item"
  >
    <div class="avatar">
      <div class="w-32 rounded-full">
        <img :src="item.image" :alt="item.name" />
      </div>
    </div>
    <h1 class="text-3xl font-semibold text-center">
      {{ item.name }}
    </h1>
    <p class="text-3xl font-bold text-center">
      ${{ parseFloat(item.options.price).toFixed(2) }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>
