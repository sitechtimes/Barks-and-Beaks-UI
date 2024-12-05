<template>
  <div
    class="card flex items-center justify-center p-3 border-b-4 border-primary h-max min-h-80 w-full"
  >
    <h1 class="card card-title text-4xl font-bold">Login</h1>
    <div class="card card-body">
      <form class="form-control">
        <label class="label">
          <span class="label-text">Username</span>
        </label>
        <input
          v-model="username"
          type="text"
          placeholder="username"
          class="input input-bordered"
        />
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input
          v-model="password"
          type="password"
          placeholder="password"
          class="input input-bordered"
        />
        <div class="w-full">
          <button
            type="submit"
            class="btn btn-primary w-full mt-3"
            @click.prevent="attemptLogin"
          >
            Login
          </button>
        </div>
        <div
          v-if="loginSuccessful === false"
          class="mt-3 text-center text-error font-semibold"
        >
          Invalid username or password
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useGlobalStore } from "@/stores/global";

const username = ref("");
const password = ref("");
const loginSuccessful = ref(null);

const store = useGlobalStore();

function attemptLogin() {
  loginSuccessful.value = store.login(username.value, password.value);
}
</script>
