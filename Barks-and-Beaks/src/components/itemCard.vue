<!-- ItemCard for Medium and large sized screens-->
<!-- make a seperate card for phones or smaller screens-->
<template>
  <div
    class="card rounded-[5px] card-compact flex items-center justify-center p-3 shadow-lg h-auto w-full border border-base-400 border-l-base-300 border-t-base-200 border-r-base-300 relative"
    v-for="item in props.items"
    :key="item"
  >
    <div class="border border-gray rounded-md h-40 w-11/12 overflow-hidden">
      <img
        :src="item.image"
        :alt="item.name"
        class="h-full w-full object-cover"
      />
    </div>
    <div class="card card-body w-full flex flex-col">
      <div class="flex flex-col justify-start">
        <div class="card card-title items-start">
          <h1 class="text-2xl font-semibold">
            {{ item.name }}
          </h1>
          <p class="text-base">
            {{ item.description }}
          </p>
          <p class="text-xl font-bold">
            ${{ parseFloat(item.options.price).toFixed(2) }}
          </p>
        </div>
      </div>
    </div>
    <div class="">
      <button
        @click="$router.push('/' + item.name)"
        class="btn rounded-full w-14 h-14 p-0 absolute bottom-[-14px] right-[-14px] flex items-center justify-center bg-gradient-to-t from-[#859FAF] to-[#8BC2E4]"
      >
        <img
          src="../assets/add-to-cart-svgrepo-com.svg"
          alt="add to cart"
          class="w-6 h-6"
        />
      </button>
    </div>
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
