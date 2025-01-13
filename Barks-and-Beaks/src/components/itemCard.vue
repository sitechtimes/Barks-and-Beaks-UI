<!-- ItemCard for Medium and large sized screens-->
<!-- make a seperate card for phones or smaller screens-->
<template>
  <div
    class="card rounded-[5px] card-compact flex items-center justify-center bg-[#D9D9D9] p-3 h-32 md:h-40 w-full relative"
    v-for="item in props.items"
    :key="item"
  >
    <div class="flex flex-row md:flex-col w-full justify-between">
      <div
        class="border border-gray rounded-md h-28 md:h-40 w-1/2 md:w-full overflow-hidden"
      >
        <img
          :src="item.image"
          :alt="item.name"
          class="h-full w-full object-cover"
        />
      </div>
      <div class="card card-body w-1/2 md:w-full flex flex-col">
        <div class="flex flex-col justify-start">
          <div class="card card-title items-start">
            <p class="text-base font-bold text-black">
              {{ item.name }}
            </p>
            <p class="text-base text-black font-semibold hidden md:block">
              {{ item.description }}
            </p>
            <p class="text-base font-bold text-black">
              ${{ parseFloat(item.options.price).toFixed(2) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="rounded-full w-18 h-18 p-2 bg-slate-100 absolute bottom-[-16px] right-[-16px] flex items-center justify-center"
    >
      <button
        @click="$router.push('/' + item.name)"
        class="btn rounded-full w-14 h-14 flex bg-gradient-to-t from-[#86A4B6] to-[#8BC2E4]"
        type="button"
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
