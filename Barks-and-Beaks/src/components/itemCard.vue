<template>
  <div
    class="card flex items-center justify-center p-3 shadow-lg h-max min-h-80 w-full border border-gray/50"
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
    <h1 class="text-2xl font-semibold text-center">
      {{ item.name }}
    </h1>
    <p class="text-xl font-bold text-center">
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
