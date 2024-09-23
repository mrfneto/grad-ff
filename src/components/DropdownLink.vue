<script setup>
import { computed } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  to: [String, Object],
  icon: String
})
</script>

<template>
  <component
    :is="to ? 'RouterLink' : 'button'"
    :to="to"
    class="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
  >
    <div class="inline-flex items-center">
      <Icon v-if="icon" :name="icon" class="size-4 mr-2" />
      <slot />
    </div>
  </component>
</template>
