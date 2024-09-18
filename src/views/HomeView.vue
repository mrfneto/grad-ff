<script setup>
import { useStore } from '@/stores'

const { user } = useStore()

console.log(user)
</script>
  
<template>
  <div class="container mx-auto">
    <h1>Home Page</h1>
    <p class="mt-4 text-gray-600">{{ user?.name }}</p>
    <button class="btn btn-primary px-6">Primary</button>
    <button class="btn btn-outline btn-icon ml-4">X</button>
  </div>
</template>
@/stores
