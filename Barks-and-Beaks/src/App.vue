<script setup></script>

<template>
  <main class="flex flex-col h-screen relative">
    <header class="flex items-center max-h-screen">
      <div
        class="w-full flex items-center p-14 md:p-9 bg-gradient-to-b from-[#576395] to-[#314596] flex-col md:flex-row justify-center z-10"
      >
        <h1
          class="btn-primary font-bold text-4xl md:text-5xl lg:text-7xl mb-3 md:mb-0 md:mr-10"
        >
          Barks and Beaks
        </h1>
      </div>
    </header>
    <footer class="flex items-center justify-center z-20">
      <button
        class="btn rounded-full btn-outline text-sm md:text-2xl fixed bottom-1 right-1 md:right-5 w-10 h-10 transition-all duration-300 ease-in-out hover:w-32 hover:h-12 flex items-center justify-center overflow-hidden"
        @click="$router.push('/admin')"
        v-if="!$route.path.includes('admin')"
      >
        <span
          class="opacity-0 hover:opacity-100 font-bold transition-opacity duration-300 w-full h-full flex items-center justify-center"
        >
          Login
        </span>
      </button>

      <button
        class="btn btn-outline font-bold text-sm md:text-2xl fixed bottom-1 right-1 md:right-5"
        @click="$router.push('/')"
        v-else
      >
        Home
      </button>
    </footer>
    <RouterView />
  </main>
</template>
