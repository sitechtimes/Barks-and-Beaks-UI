<template>
  <div
    class="fixed inset-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-70 z-50 overflow-scroll"
  >
    <div
      class="flex items-center justify-center bg-gray-100 h-full w-full border border-base-400 border-l-base-300 border-t-base-200 border-r-base-300"
    >
      <div class="card card-body">
        <div class="card card-title">
          <h2 class="text-4xl font-semibold text-center">
            {{ item.name }}
          </h2>
          <p class="text-2xl font-bold text-center">
            ${{ parseFloat(item.price).toFixed(2) }}
          </p>
          <p class="text-2xl text-center mb-5">{{ item.desription }}</p>

          <div
            v-for="(options, modifier) in item.modifiers"
            :key="modifier"
            class="flex flex-col items-start justify-start w-full"
          >
            <h2 class="text-2xl font-bold text-left self-start">
              {{ modifier }}
            </h2>
            <div
              class="flex flex-row items-center justify-start w-full"
              v-for="option in options"
              :key="option"
            >
              <input
                type="radio"
                :name="modifier"
                class="radio"
                v-model="item.modifiers[modifier]"
              />
              <label class="label">
                <span class="label-text ml-2">{{ option }}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="card card-actions h-full justify-end"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

console.log(props.item);
</script>
