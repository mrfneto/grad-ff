<script setup>
import { computed } from 'vue'
import Icon from './Icon.vue'

defineProps({
  type: {
    type: String,
    default: 'submit'
  },
  loading: Boolean,
  icon: String,
  square: Boolean,
  primary: Boolean
})

const classes = computed(() => {
  return `inline-flex items-center px-4 py-2.5 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition `
})
</script>

<template>
  <button
    :type="type"
    class="inline-flex items-center px-4 py-2.5 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition"
  >
    <Icon :name="icon" v-if="icon && !loading" class="size-5 mr-2" />

    <Icon name="LoaderCircle" v-if="loading" class="size-5 animate-spin" />

    <slot v-else />
  </button>
</template>
