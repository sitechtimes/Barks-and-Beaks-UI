<template>
  <div class="p-4 h-full w-full flex flex-col justify-center items-center">
    <login-card v-if="!store.loggedIn" class="mb-4" />
    <div v-else class="w-full max-w-4xl overflow-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Customer</th>
            <th class="py-2 px-4 border-b">Order Name</th>
            <th class="py-2 px-4 border-b">Modifiers</th>
            <th class="py-2 px-4 border-b">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-100">
            <td class="py-2 px-4 border-b">{{ order.customerName }}</td>
            <td class="py-2 px-4 border-b">{{ order.orderName }}</td>
            <td class="py-2 px-4 border-b">{{ order.modifiers }}</td>
            <td class="py-2 px-4 border-b">{{ order.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { createClient } from "@supabase/supabase-js";
import supabaseJson from "../../supabase.json";
const orders = ref([]);
const supabaseUrl = "https://jmfmzgmmnspbazrstjxm.supabase.co";
const supabaseAnonKey = supabaseJson.supabase;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
const fetchOrders = async () => {
  const { data, error } = await supabase.from("CurrentOrders").select("*");

  if (error) {
    console.error("Error fetching orders:", error);
  } else {
    orders.value = data;
  }
};

onMounted(async () => {
  fetchOrders();
  // This is where you will call your API to fetch orders
  // For now, we'll use mock data
  orders.value = [
    {
      id: 1,
      customerName: "John Doe",
      orderName: "Pizza",
      modifiers: "Extra cheese",
      total: 100,
    },
    {
      id: 2,
      customerName: "Jane Smith",
      orderName: "Burger",
      modifiers: "No onions",
      total: 150,
    },
    {
      id: 3,
      customerName: "Bob Johnson",
      orderName: "Pasta",
      modifiers: "Gluten-free",
      total: 200,
    },
  ];
  for (let i = 4; i <= 40; i++) {
    orders.value.push({
      id: i,
      customerName: `Customer ${i}`,
      orderName: `Order ${i}`,
      modifiers: `Modifier ${i}`,
      total: Math.floor(Math.random() * 300) + 50,
    });
  }
});
import { useGlobalStore } from "@/stores/global";
import loginCard from "@/components/loginCard.vue";

const store = useGlobalStore();
</script>
