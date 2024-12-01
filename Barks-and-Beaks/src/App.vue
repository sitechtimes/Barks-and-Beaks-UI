<script setup></script>

<template>
  <main class="flex flex-col h-screen">
    <header class="flex items-center max-h-screen">
      <div
        class="w-full flex items-center p-14 md:p-9 bg-gradient-to-b from-[#576395] to-[#314596] flex-col md:flex-row justify-center"
      >
        <h1
          class="btn-primary font-bold text-4xl md:text-5xl lg:text-7xl mb-3 md:mb-0 md:mr-10"
        >
          Barks and Beaks
        </h1>
        <button
          class="btn btn-outline font-bold text-sm md:text-2xl absolute top-1 right-1 md:top-2.5 md:right-5"
        >
          Login
        </button>
      </div>
    </header>

    <RouterView />
  </main>
</template>
