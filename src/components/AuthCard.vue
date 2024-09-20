<script setup>
import Logo from './Logo.vue'
</script>

<template>
  <div class="flex-1 flex flex-col justify-center items-center">
    <div>
      <Logo class="size-16 mx-auto" />
    </div>

    <div
      class="w-full sm:max-w-md mt-6 px-6 py-4 shadow-md overflow-hidden sm:rounded-lg"
    >
      <slot />
    </div>
  </div>
</template>
