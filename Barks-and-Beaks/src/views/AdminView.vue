<template>
  <div class="p-4 h-full w-full flex flex-col justify-center items-center">
    <login-card v-if="!store.loggedIn" class="mb-4" />
    <div v-else class="w-full max-w-4xl overflow-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Customer</th>
            <th class="py-2 px-4 border-b">Order</th>
            <th class="py-2 px-4 border-b">Modifiers</th>
            <th class="py-2 px-4 border-b">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-100">
            <td class="py-2 px-4 border-b">{{ order.name }}</td>
            <td class="py-2 px-4 border-b">
              <div v-for="item in order.items" :key="item">
                <div v-for="(value, key) in item" :key="key">
                  {{ key }}: {{ value }}
                </div>
              </div>
            </td>
            <td class="py-2 px-4 border-b">
              <div v-for="item in order.modifiers" :key="item">
                {{ item }}
              </div>
            </td>
            <td class="py-2 px-4 border-b">${{ order.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

import { useGlobalStore } from "@/stores/global";
import loginCard from "@/components/loginCard.vue";

const store = useGlobalStore();

onMounted(async () => {
  store.loadOrders();
});

const orders = computed(() => store.orders);

function placeOrder() {
  const orderDetails = orders.value.map((order) => {
    return {
      name: order.name,
      items: order.items.map((item) => {
        return {
          name: item.name,
          description: item.description,
          image: item.image,
          options: item.options,
          quantity: item.quantity,
          selectedModifiers: item.selectedModifiers,
        };
      }),
      modifiers: order.modifiers,
      price: order.price,
    };
  });

  // Assuming you have a function to send the order details to the server
  store.submitOrder(orderDetails);
}
</script>
