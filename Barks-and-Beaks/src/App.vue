<script setup></script>

<template>
  <main class="flex flex-col h-screen">
    <header class="flex items-center max-h-screen">
      <div
        class="w-full flex items-center justify-center p-9 bg-gradient-to-b from-[#576395] to-[#314596]"
      >
        <h1 class="btn-primary font-bold text-4xl md:text-5xl lg:text-7xl">
          Barks and Beaks
        </h1>
      </div>
    </header>

    <RouterView />
  </main>
</template>
