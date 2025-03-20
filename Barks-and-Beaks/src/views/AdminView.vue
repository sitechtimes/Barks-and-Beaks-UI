<template>
  <div class="p-6 h-full w-full flex flex-col items-center">
    <login-card v-if="!store.loggedIn" class="mb-6" />

    <div
      v-else
      class="w-full max-w-5xl overflow-auto bg-white shadow-lg rounded-lg p-6"
    >
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-3 md:mt-0">
        Current Orders
      </h2>

      <table class="hidden md:table min-w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 text-gray-700 uppercase text-sm">
            <th class="py-3 px-4 border-b text-left">Customer</th>
            <th class="py-3 px-4 border-b text-left">Order</th>
            <th class="py-3 px-4 border-b text-left">Pickup Option</th>
            <th class="py-3 px-4 border-b text-left">Ready Time</th>
            <th class="py-3 px-4 border-b text-left">Total</th>
            <th class="py-3 px-4 border-b text-left">Note</th>
            <th class="py-3 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in orders"
            :key="order.id"
            class="border-b hover:bg-gray-50"
          >
            <td class="py-3 px-4 font-medium text-gray-800">
              {{ order.name }}
            </td>
            <td class="py-3 px-4">
              <ul class="space-y-2">
                <li
                  v-for="(item, index) in order.items"
                  :key="index"
                  class="bg-gray-200 p-3 rounded-lg shadow-sm"
                >
                  <span class="font-semibold text-gray-900">{{ item[0] }}</span>
                  <span class="text-gray-600"> (x{{ item[1] }})</span>

                  <div
                    v-if="item[2] && Object.keys(item[2]).length"
                    class="mt-2 text-sm text-gray-700"
                  >
                    <span class="font-medium text-gray-800">Modifiers:</span>
                    <ul class="ml-4 list-disc space-y-1">
                      <li v-for="(value, key) in item[2]" :key="key">
                        <span class="text-gray-800">{{ key }}:</span>
                        <span v-if="Array.isArray(value)" class="text-gray-600">
                          {{ value.join(", ") }}</span
                        >
                        <span v-else class="text-gray-600"> {{ value }}</span>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </td>
            <td class="py-3 px-4 font-medium text-gray-800">
              {{ order.pickup }}
              <div
                v-if="order.pickup === 'Delivery'"
                class="text-sm text-gray-600"
              >
                Room: {{ order.room }}
              </div>
            </td>
            <td class="py-3 px-4 font-medium text-gray-800">
              {{ order.readyTime }}
            </td>
            <td class="py-3 px-4 font-semibold text-gray-800">
              ${{ order.price }}
            </td>
            <td class="py-3 px-4 font-medium text-gray-800">
              {{ order.note }}
            </td>
            <td class="py-3 px-4">
              <button
                class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                @click="showConfirmComplete(order.id)"
              >
                Complete Order
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="md:hidden space-y-4">
        <div
          v-for="order in orders"
          :key="order.id"
          class="border rounded-lg p-4 shadow-md bg-gray-50"
        >
          <h3 class="text-lg font-semibold text-gray-800">{{ order.name }}</h3>
          <div class="mt-2 space-y-2">
            <div
              v-for="(item, index) in order.items"
              :key="index"
              class="bg-white p-3 rounded-md shadow-sm"
            >
              <span class="font-semibold text-gray-900">{{ item[0] }}</span>
              <span class="text-gray-600"> (x{{ item[1] }})</span>

              <div
                v-if="item[2] && Object.keys(item[2]).length"
                class="mt-2 text-sm text-gray-700"
              >
                <span class="font-medium text-gray-800">Modifiers:</span>
                <ul class="ml-4 list-disc space-y-1">
                  <li v-for="(value, key) in item[2]" :key="key">
                    <span class="text-gray-800">{{ key }}:</span>
                    <span v-if="Array.isArray(value)" class="text-gray-600">
                      {{ value.join(", ") }}</span
                    >
                    <span v-else class="text-gray-600"> {{ value }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="mt-3 font-medium text-gray-800">
            Pickup Option: {{ order.pickup }}
            <div
              v-if="order.pickup === 'Delivery'"
              class="text-sm text-gray-600"
            >
              Room: {{ order.room }}
            </div>
          </div>
          <div class="mt-1 font-medium text-gray-800">
            Ready Time: {{ order.readyTime }}
          </div>
          <div class="mt-1 font-medium text-gray-800">
            Note: {{ order.note }}
          </div>
          <div class="mt-3 font-semibold text-gray-900">
            Total: ${{ order.price }}
          </div>
          <button
            class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mt-4"
            @click="showConfirmComplete(order.id)"
          >
            Complete Order
          </button>
        </div>
      </div>
      <confirm-complete
        v-if="showConfirm"
        @confirm="completeOrder"
        @cancel="cancelComplete"
      />

      <div v-if="completedOrders.length" class="mt-6 w-full max-w-5xl">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Completed Orders
        </h2>
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 text-gray-700 uppercase text-sm">
              <th class="py-3 px-4 border-b text-left">Customer</th>
              <th class="py-3 px-4 border-b text-left">Order</th>
              <th class="py-3 px-4 border-b text-left">Pickup Option</th>
              <th class="py-3 px-4 border-b text-left">Ready Time</th>
              <th class="py-3 px-4 border-b text-left">Total</th>
              <th class="py-3 px-4 border-b text-left">Note</th>
              <th class="py-3 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in completedOrders"
              :key="order.id"
              class="border-b hover:bg-gray-50"
            >
              <td class="py-3 px-4 font-medium text-gray-800">
                {{ order.name }}
              </td>
              <td class="py-3 px-4">
                <ul class="space-y-2">
                  <li
                    v-for="(item, index) in order.items"
                    :key="index"
                    class="bg-gray-200 p-3 rounded-lg shadow-sm"
                  >
                    <span class="font-semibold text-gray-900">{{
                      item[0]
                    }}</span>
                    <span class="text-gray-600"> (x{{ item[1] }})</span>
                  </li>
                </ul>
              </td>
              <td class="py-3 px-4 font-medium text-gray-800">
                {{ order.pickup }}
              </td>
              <td class="py-3 px-4 font-medium text-gray-800">
                {{ order.readyTime }}
              </td>
              <td class="py-3 px-4 font-semibold text-gray-800">
                ${{ order.price }}
              </td>
              <td class="py-3 px-4 font-medium text-gray-800">
                {{ order.note }}
              </td>
              <td class="py-3 px-4">
                <button
                  class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  @click="restoreOrder(order.id)"
                >
                  Restore Order
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useGlobalStore } from "@/stores/global";
import loginCard from "@/components/loginCard.vue";
import confirmComplete from "@/components/confirmComplete.vue";

const store = useGlobalStore();
const showConfirm = ref(false);
let currentOrderId = null;

onMounted(async () => {
  store.loadOrders();
  store.loadStats();
});

const orders = computed(() => store.orders);
const completedOrders = computed(() => store.stats);

const completeOrder = async () => {
  showConfirm.value = false;
  if (currentOrderId !== null) {
    const order = store.orders.find((order) => order.id === currentOrderId);
    await store.completeOrder(currentOrderId);
    currentOrderId = null;
  }
};

const cancelComplete = () => {
  showConfirm.value = false;
  currentOrderId = null;
};

const showConfirmComplete = (orderId) => {
  currentOrderId = orderId;
  showConfirm.value = true;
};

const restoreOrder = async (orderId) => {
  const order = completedOrders.value.find((order) => order.id === orderId);
  if (order) {
    await store.restoreItem(
      order.name,
      order.items,
      order.price,
      order.note,
      order.pickup,
      order.room,
      order.readyTime,
      orderId
    );
  }
};
</script>
