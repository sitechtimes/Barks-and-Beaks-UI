<script setup></script>

<template>
  <main class="p-3">
    <header class="flex items-center max-h-screen">
      <div class="card bg-base-100 w-96 shadow-xl">
        <h1 class="card-title">Barks and Beaks</h1>
        <p class="card-body">A Vue 3 Template</p>
        <div class="card-actions justify-end">
          <button href="" class="btn btn-primary">Buy</button>
        </div>
      </div>
    </header>

    <RouterView />
  </main>
</template>